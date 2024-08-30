const router = require('express').Router();
const { Club } = require('../../models');

// Get all clubs
router.get('/', async (req, res) => {
  try {
    const clubData = await Club.findAll();
    res.status(200).json(clubData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

// get club by id

router.get('/:id', async (req, res) => {
  try {
    const clubData = await Club.findByPk(req.params.id, {
      // include: [Product]
    });

    if (!clubData) {
      res.status(404).json({ message: 'No club found with this id!' });
      return;
    }

    res.status(200).json(clubData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a club
router.post('/', async (req, res) => {
  try {
    const clubData = await Club.create(req.body);
    res.status(200).json(clubData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a club
router.delete('/:id', async (req, res) => {
  try {
    const clubData = await Club.destroy({
      where: { id: req.params.id }
    });
    if (!clubData) {
      res.status(404).json({ message: 'No club with this id!' });
      return;
    }
    res.status(200).json(clubData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
