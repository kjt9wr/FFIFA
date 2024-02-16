const router = require("express").Router();
const Trade = require("../models/trade.model");
const Player = require("../models/player.model");

// Get all trades
router.route("/").get((req, res) => {
  Trade.find()
    .then((trade) => res.json(trade))
    .catch((err) => res.status(400).json("Unable to find trade: " + err));
});

// Add a new trade
router.route("/add").post(async (req, res) => {
  const { owner1, owner2, owner1_rec, owner2_rec, tradeNotes, years } =
    req.body;

  const newTrade = new Trade({
    owner1: owner1,
    owner2: owner2,
    owner1_rec,
    owner2_rec,
    tradeNotes,
    years,
  });

  await Player.updateMany(
    { _id: { $in: owner1_rec.players } },
    { $set: { owner: ownersIDByName[owner1] } }
  );

  await Player.updateMany(
    { _id: { $in: owner2_rec.players } },
    { $set: { owner: ownersIDByName[owner2] } }
  );

  newTrade
    .save()
    .then(() => res.json("Trade added!"))
    .catch((err) => res.status(400).json("Unable to add trade: " + err));
});

const ownersIDByName = {
  Kevin: "5e80d724b3bdaf3413316177",
  Justin: "5e80d930b3bdaf3413316189",
  Alex: "5e80dd6ab3bdaf34133161bd",
  Luigi: "5e80da66b3bdaf341331619b",
  Christian: "5e80e173b3bdaf3413316213",
  Matt: "5e80df96b3bdaf34133161ef",
  Brent: "5e80db62b3bdaf34133161ab",
  Michael: "5e80de37b3bdaf34133161cf",
  Nikos: "5e80dedcb3bdaf34133161dd",
  Chinmay: "5e80e07eb3bdaf3413316200",
  Patrick: "5e80e1dab3bdaf3413316225",
  Jeff: "5e80e1deb3bdaf3413316226",
};

module.exports = router;
