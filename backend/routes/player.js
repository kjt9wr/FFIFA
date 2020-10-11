const router = require('express').Router();
const Owner = require('../models/owner.model');
let Player = require('../models/player.model');

router.route('/').get((req, res) => {
  Player.find()
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add player to db
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const keep = Boolean(req.body.keep);
  const position = req.body.position;
  const franchise = Boolean(req.body.franchise);

  const newPlayer = new Player({
    name,
    price,
    keep,
    position,
    franchise
  });

  newPlayer.save()
  .then(() => res.json('New Player added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


// Updating a keeper
router.route('/update/:pid').post((req, res) => {
  const keep = req.body.keep;
  Player.findById(req.params.pid).
    then(player => {
      //const myIndex = player.roster.findIndex(currplayer => currplayer._id == req.params.pid);
      player.keep = keep;
      player.save()
          .then(() => res.json('Player updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;