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

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await Member.create({
      username,
      email,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error signing up');
  }
});

module.exports = router;
