const router = require('express').Router();
let Trade = require('../models/trade.model');

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
    owner1,
    owner2,
    owner1_rec,
    owner2_rec,
    tradeNotes
  });

  newTrade.save()
    .then(() => res.json('Trade added!'))
    .catch(err => res.status(400).json('Unable to add trade: ' + err));
}); 

module.exports = router;
