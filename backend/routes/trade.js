const router = require('express').Router();
const Trade = require('../models/trade.model');
const Player = require('../models/player.model');

router.route('/').get((req, res) => {
  Trade.find()
    .then(trade => res.json(trade))
    .catch(err => res.status(400).json('Unable to find trade: ' + err));
});

router.route('/add').post((req, res) => {
  const owner1 = req.body.owner1;
  const owner2 = req.body.owner2;
  const owner1_rec = req.body.owner1_rec;
  const owner2_rec = req.body.owner2_rec;
  const tradeNotes = req.body.tradeNotes;
  const years = req.body.years;

  const newTrade = new Trade({
    owner1: owner1,
    owner2: owner2,
    owner1_rec,
    owner2_rec,
    tradeNotes,
    years
  });
owner1_rec.players.map(playerid => updatePlayersOwner(res, playerid, owner1));
owner2_rec.players.map(playerid => updatePlayersOwner(res, playerid, owner2));
  newTrade.save()
    .then(() => res.json('Trade added!'))
    .catch(err => res.status(400).json('Unable to add trade: ' + err));
}); 

const updatePlayersOwner = async (res, pid, ownerName) => {
  const ownerid = ownersIDByName[ownerName];
  Player.findById(pid)
  .then(player => {
    player.owner = ownerid;
    player.save()
        .catch(err => res.status(400).json('Unable to update player: ' + err));
    })
    .catch(err => res.status(400).json('Unable to find player: ' + err));
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
