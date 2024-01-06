const router = require('express').Router();
const Player = require('../models/player.model');

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
  const rank = Number(req.body.rank);
  const owner = ownersIDByName[req.body.ownerName];
  const sleeperId = req.body.sleeperId;
  const newPlayer = new Player({ name, price, keep, position, rank, owner, sleeperId });

  newPlayer.save()
  .then(() => res.json(name + ' added! ID: '+ newPlayer._id ))
  .catch(err => res.status(400).json('Unable to add player: ' + err));
});

router.route('/add/sleeperId').post((req, res) => {
  Player.findOne({ name: req.body.name })
    .then(player => {
      player.sleeperId = req.body.sleeperId;
      player.save()
          .then(() => res.json(player.name + ' sleeperId updated!'))
          .catch(err => res.status(400).json('Unable to update player: ' + err));
      })
      .catch(err => res.status(400).json('Unable to find player: ' + err));
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

  // Set a player's arbitration year
router.route('/arbitration').put((req, res) => {
  Player.findById(req.body.pid)
    .then(player => {
      player.arbYear = req.body.arbYear;
      player.save()
          .then(() => res.json(player.name + ' arbitration year updated!'))
          .catch(err => res.status(400).json('Unable to save player arbitration year: ' + err));
      })
      .catch(err => res.status(400).json('Unable to find player: ' + err));
  });

  // Change a player's keeper class
  router.route('/keeperClass').put((req, res) => {
    Player.findById(req.body.pid)
      .then(player => {
        player.keeperClass = req.body.keeperClass;
        player.save()
            .then(() => res.json(player.name + ' Keeper class updated!'))
            .catch(err => res.status(400).json('Unable to save keeper class : ' + err));
        })
        .catch(err => res.status(400).json('Unable to find player: ' + err));
  });

//reset all keeper classes
router.route('/reset/keeperClass').put((req, res) => {
Player.find().then(player => {
  player.keeperClass = 0; 
  player.save()
  .then(() => res.json(player.name + ' Keeper class updated!'))
  .catch(err => res.status(400).json('Unable to save keeper class : ' + err));
})

  });

// Change a player's supermax status
router.route('/superMax').put((req, res) => {
  Player.findById(req.body.pid)
    .then(player => {
      player.superMax.plan = req.body.superMaxPlan;
      player.superMax.year = req.body.superMaxYear;
      player.keep = true;
      player.save()
          .then(() => res.json(player.name + ' super max status updated!'))
          .catch(err => res.status(400).json('Unable to save player supermax : ' + err));
      })
      .catch(err => res.status(400).json('Unable to find player: ' + err));
  });

// Change a player's owner 
router.route('/update/owner').put((req, res) => {
  const ownerid = ownersIDByName[req.body.ownerName];
    Player.findById(req.body.pid)
    .then(player => {
      player.owner = ownerid;
      player.save()
          .then(() => res.json(player.name + ' owner updated!'))
          .catch(err => res.status(400).json('Unable to update player: ' + err));
      })
      .catch(err => res.status(400).json('Unable to find player: ' + err));
});

// Update roster
router.route('/update/roster/:ownerId').post((req, res) => {
  const playersToUpdate = req.body.players;
  Player.updateMany({
      sleeperId: {
        $in: playersToUpdate
      }}, {
        $set: { owner: req.params.ownerId }
      })
  .then(() => res.json('Updated!'))
});

// Updating a draft result
router.route('/draftResult').put((req, res) => {
  let ownerid = ownersIDByName[req.body.ownerName];
    Player.findById(req.body.pid)
    .then(player => {
      player.owner = ownerid;
      player.price = Math.trunc(req.body.price*1.2);
      player.save()
          .then(() => res.json(player.name + ' drafted by ' + req.body.ownerName +  ' at $' + req.body.price))
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

const ownersIDByName = {
  "Kevin" : "5e80d724b3bdaf3413316177",
  "Justin" : "5e80d930b3bdaf3413316189",
  "Alex" : "5e80dd6ab3bdaf34133161bd",
  "Luigi" : "5e80da66b3bdaf341331619b",
  "Christian" : "5e80e173b3bdaf3413316213",
  "Matt" : "5e80df96b3bdaf34133161ef",
  "Brent" : "5e80db62b3bdaf34133161ab",
  "Michael" : "5e80de37b3bdaf34133161cf",
  "Nikos" : "5e80dedcb3bdaf34133161dd",
  "Chinmay" : "5e80e07eb3bdaf3413316200",
  "Patrick" : "5e80e1dab3bdaf3413316225",
  "Jeff" : "5e80e1deb3bdaf3413316226",
};

module.exports = router;
