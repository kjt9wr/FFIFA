const router = require("express").Router();
const Trade = require("../models/trade.model");
const Player = require("../models/player.model");
const idMap = require("../utils/idMaps.js");

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

  try {
    await Player.updateMany(
      { _id: { $in: owner1_rec.players } },
      { $set: { owner: idMap.ownersIDByName[owner1] } }
    );

    await Player.updateMany(
      { _id: { $in: owner2_rec.players } },
      { $set: { owner: idMap.ownersIDByName[owner2] } }
    );

    const trade = await Trade.create({
      owner1,
      owner2,
      owner1_rec,
      owner2_rec,
      tradeNotes,
      years,
    });

    res.json({ message: "Trade added successfully!", trade: trade });
  } catch (error) {
    res.status(400).json("Unable to add trade: ", error);
  }
});

module.exports = router;
