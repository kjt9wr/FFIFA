const router = require('express').Router();
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
  const rank = Number(req.body.rank);

  const newPlayer = new Player({
    name,
    price,
    keep,
    position,
    franchise,
    rank
  });

  newPlayer.save()
  .then(() => res.json(name + ' added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Updating a keeper
router.route('/update/:pid').post((req, res) => {
  const keep = req.body.keep;
  Player.findById(req.params.pid)
    .then(player => {
      player.keep = keep;
      player.save()
          .then(() => res.json('Player updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Change a player's power ranking
router.route('/rank').post((req, res) => {
  const id = req.body.pid;
  const rank = req.body.rank;
  Player.findById(id)
    .then(player => {
      player.rank = rank;
      player.save()
          .then(() => res.json(player.name + ' rank updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // Get all for given position
router.route('/getAll/:pos').get((req, res) => {
  Player.find({position: req.params.pos })
  .then((data) => { 
    const list = data.map((player) => {
      return {
        _id: player.id,
        name: player.name,
        rank: player.rank
     }
    })
    .sort((a,b) => a.rank - b.rank);
    res.send({data: list}); 
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;