const router = require('express').Router();
let Player = require('../models/player.model');

router.route('/').get((req, res) => {
  Player.find()
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Unable to find player: ' + err));
});

// add player to db
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const keep = Boolean(req.body.keep);
  const position = req.body.position;
  const franchise = Boolean(req.body.franchise);
  const rank = Number(req.body.rank);

  const newPlayer = new Player({ name, price, keep, position, franchise, rank });

  newPlayer.save()
  .then(() => res.json(name + ' added!'))
  .catch(err => res.status(400).json('Unable to add player: ' + err));
});

// Updating a keeper
router.route('/update/:pid').post((req, res) => {
  Player.findById(req.params.pid)
    .then(player => {
      player.keep = req.body.keep;
      player.save()
          .then(() => res.json('Player updated!'))
          .catch(err => res.status(400).json('Unable to update player: ' + err));
      })
      .catch(err => res.status(400).json('Unable to find player: ' + err));
  });

  // Get all players for given position, ordered by rank
  router.route('/getAll/:pos').get((req, res) => {
    Player.find({position: req.params.pos })
    .then((data) => { 
      res.send({data: getAllPlayersOrderedByRank(data)}); 
    })
    .catch(err => res.status(400).json('Unable to find player: ' + err));
  })


// Change a player's power ranking
router.route('/rank').post((req, res) => {
  Player.findById(req.body.pid)
    .then(player => {
      player.rank = req.body.rank;
      player.save()
          .then(() => res.json(player.name + ' rank updated!'))
          .catch(err => res.status(400).json('Unable to save player ranking: ' + err));
      })
      .catch(err => res.status(400).json('Unable to find player: ' + err));
  });

const getAllPlayersOrderedByRank = (playerList) => {
  return playerList.map((player) => {
    return {
      _id: player.id,
      name: player.name,
      rank: player.rank
   }
  }).sort((a,b) => a.rank - b.rank);
}

module.exports = router;
