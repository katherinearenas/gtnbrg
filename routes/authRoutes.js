const express = require('express');

const router = express.Router();
const Members = require('../models/Members');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const member = await Members.findOne({ where: { email } });

    if (member && (await member.validatePassword(password))) {
      res.redirect('/home');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

router.post('/login', login);

module.exports = router;
