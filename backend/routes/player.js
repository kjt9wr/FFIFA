const router = require('express').Router();
let Player = require('../models/player.model');

router.route('/').get((req, res) => {
  Player.find()
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Unable to find player: ' + err));
});

router.route('/roster/:ownerID').get((req, res) => {
  Player.find({owner: req.params.ownerID })
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
router.route('/rank').put((req, res) => {
  Player.findById(req.body.pid)
    .then(player => {
      player.rank = req.body.rank;
      player.save()
          .then(() => res.json(player.name + ' rank updated!'))
          .catch(err => res.status(400).json('Unable to save player ranking: ' + err));
      })
      .catch(err => res.status(400).json('Unable to find player: ' + err));
  });

  // Change a player's franchise status
router.route('/franchise').put((req, res) => {
  Player.findById(req.body.pid)
    .then(player => {
      player.franchise = req.body.franchise;
      player.keep = req.body.franchise;
      player.superMax = 0;
      player.save()
          .then(() => res.json(player.name + ' franchise status updated!'))
          .catch(err => res.status(400).json('Unable to save player franchise status : ' + err));
      })
      .catch(err => res.status(400).json('Unable to find player: ' + err));
  });


    // Change a player's supermax status
router.route('/superMax').put((req, res) => {
  Player.findById(req.body.pid)
    .then(player => {
      player.superMax = req.body.superMax;
      player.keep = true;
      player.franchise = false;
      player.save()
          .then(() => res.json(player.name + ' super max status updated!'))
          .catch(err => res.status(400).json('Unable to save player supermax : ' + err));
      })
      .catch(err => res.status(400).json('Unable to find player: ' + err));
  });

  // Updating a draft result
router.route('/draftResult').put((req, res) => {
  Player.findById(req.body.player)
    .then(player => {
      player.owner = req.body.owner;
      player.price = req.body.price;
      player.keep = false;
      player.franchise = false;
      player.superMax = false;
      player.save()
          .then(() => res.json(player.name + ' will cost $' + player.price))
          .catch(err => res.status(400).json('Unable to update player: ' + err));
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
