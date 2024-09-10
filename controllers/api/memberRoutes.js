const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Member, Memberlist } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const memberData = await Member.findAll();
    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  res.render('signup', { layout: false, title: 'Sign Up' });
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = await Member.create({
      name: username,
      email,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch (error) {
    console.error('Error signing up', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
});

router.get('/login', (req, res) => {
  try {
      res.render('login');  // Ensure 'login' view exists in your views directory
  } catch (error) {
      console.error('Error rendering login page:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const member = await Member.findOne({
      where: {
        email
      }
    });

    if (!member) {
      res.status(401).json({
        message: 'Incorrect email or password.'
      });
      return;
    }

    const isValid = await bcrypt.compare(password, member.password);

    if (!isValid) {
      res.status(401).json({
        message: 'Incorrect email or password.'
      });
      return;
    }
    
   
    req.session.memberId = member.id;
    req.session.memberName = member.name;
    req.session.loggedIn = true;

    res.redirect('/');
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
});

router.get('/profile', (req, res)=> {
  try {
    res.render('profile');
} catch (error) {
    console.error('Error rendering profile page:', error);
    res.status(500).send('Internal Server Error');
};
});
router.get('/', async (req, res) => {
  try {
    const memberId = req.session.memberId;
    const memberClubs = await Memberlist.findAll({
      where: { member_id: memberId }
  })
    // const profileClubs
    console.log('Member clubs:', memberClubs)
    res.render('profile', { clubs: memberClubs });
  } catch (err) {
    console.error('Error fetching member clubs:', err);
    res.status(500).json({ message: 'Failed to fetch member clubs', error: err.message });
  }}
);


router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Logout error:', error);
      return res.status(500).send('Error Logging out');
    }
    res.redirect('/login');
  })
})

router.get('/:id', async (req, res) => {
  try {
    const memberData = await Member.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      // include: [{ model: Location, through: Trip, as: 'planned_trips' }]
    });

    if (!memberData) {
      res.status(404).json({ message: 'No member found with this id!' });
      return;
    }

    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const memberData = await Member.create(req.body);
    res.status(200).json(memberData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const memberData = await Member.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!memberData) {
      res.status(404).json({ message: 'No member found with this id!' });
      return;
    }

    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;