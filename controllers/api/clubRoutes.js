const router = require('express').Router();
const { Club, Memberlist, Member} = require('../../models');

router.get('/', async (req, res) => {
  try {
    const clubData = await Club.findAll();

    console.log('Clubs data:', clubData);

    res.render('clubs', { clubs: clubData });
  } catch (err) {
    console.error('Error fetching clubs:', err);
    res.status(500).json({ message: 'Failed to fetch clubs', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.id);

    if (!club) {
      res.status(404).json({ message: 'No club found with this id!' });
      return;
    }

    res.render('club', { club });

  } catch (err) {
    console.error('Error fetching club:', err);
    res.status(500).json(err);
  }
});

// POST route for allowing a user to join an existing club
router.post('/join/:clubId', async (req, res) => {
  try {
    const { clubId } = req.params;
    const memberId = req.session.memberId;
    const existingEntry = await Memberlist.findOne({
      where: { club_id: clubId, member_id: memberId }
    });
    if (existingEntry) {
      return res.status(400).send('Member already in club');
    }
    const join = await Memberlist.create({ club_id: clubId, members_id: memberId });
    console.log(join);
    res.json({ success: true, message: "Successfully joined the club!" });
  } catch (error) {
    console.error('Error joining club:', error);
    res.status(500).send('Error joining club');
  }
})

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
