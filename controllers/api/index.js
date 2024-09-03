const router = require('express').Router();
const memberRoutes = require('./memberRoutes');
const bookRoutes = require('./bookRoutes');
const clubRoutes = require('./clubRoutes');
const libraryRoutes = require('./libraryRoutes.js')

router.use('/books', bookRoutes);
router.use('/clubs', clubRoutes);
router.use('/members', memberRoutes);
router.use('/libraries', libraryRoutes)

module.exports = router;
