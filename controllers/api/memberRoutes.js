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

module.exports = router;
