const router = require('express').Router();
const { Library } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const memberData = await Library.findAll();
    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const libraryData = await Library.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      // include: [{ model: Location, through: Trip, as: 'planned_trips' }]
    });

    if (!libraryData) {
      res.status(404).json({ message: 'No library found with this id!' });
      return;
    }

    res.status(200).json(libraryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const libraryData = await Library.create(req.body);
    res.status(200).json(libraryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const libraryData = await Library.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!libraryData) {
      res.status(404).json({ message: 'No library found with this id!' });
      return;
    }

    res.status(200).json(libraryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;