const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Member } = require('../../models');

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
    res.json({ success: true, message: 'Signup successful' });
  } catch (error) {
    console.error(error);
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
    req.session.loggedIn = true;

    res.redirect('/');
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
});

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
