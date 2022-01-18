const router = require('express').Router();
let Trade = require('../models/trade.model');
let Player = require('../models/player.model');


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

  const newTrade = new Trade({
    owner1_id: owner1,
    owner2_id: owner2,
    owner1_rec,
    owner2_rec,
    tradeNotes
  });
owner1_rec.players.map(playerid => updatePlayersOwner(res, playerid, owner1));
owner2_rec.players.map(playerid => updatePlayersOwner(res, playerid, owner2));


  newTrade.save()
    .then(() => res.json('Trade added!'))
    .catch(err => res.status(400).json('Unable to add trade: ' + err));
}); 

const updatePlayersOwner = async (res, pid, ownerid) => {
  Player.findById(pid)
  .then(player => {
    player.owner = ownerid;
    player.save()
        .then(() => res.json('Player updated!'))
        .catch(err => res.status(400).json('Unable to update player: ' + err));
    })
    .catch(err => res.status(400).json('Unable to find player: ' + err));
}

module.exports = router;
