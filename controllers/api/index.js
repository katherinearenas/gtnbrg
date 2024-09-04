const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const clubRoutes = require('./clubRoutes');
const libraryRoutes = require('./libraryRoutes.js')

router.use('/books', bookRoutes);
router.use('/clubs', clubRoutes);
router.use('/members', userRoutes);
router.use('/libraries', libraryRoutes)

module.exports = router;
