const router = require('express').Router();
const memberRoutes = require('./memberRoutes');
const bookRoutes = require('./bookRoutes');
const clubRoutes = require('./clubRoutes');

router.use('/books', bookRoutes);
router.use('/clubs', clubRoutes);
router.use('/members', memberRoutes);

module.exports = router;
