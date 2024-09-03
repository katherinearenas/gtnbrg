const router = require('express').Router();
const { Member, Club, Book } = require('../../models');

// GET all members
router.get('/', async (req, res) => {
  try {
    const memberData = await Member.findAll();
    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a member
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

// CREATE a member
router.post('/', async (req, res) => {
  try {
    const memberData = await Member.create(req.body);
    res.status(200).json(memberData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// DELETE a member
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
