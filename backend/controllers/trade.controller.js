const Trade = require("../models/trade.model");
const Player = require("../models/player.model");
const idMap = require("../utils/idMaps.js");

// GET all trades
const getAllTrades = async (req, res) => {
  Trade.find()
    .then((trade) => res.json(trade))
    .catch((err) => res.status(400).json("Unable to find trade: " + err));
};

// POST add a new trade
const createTrade = async (req, res) => {
  const { owner1, owner2, owner1_rec, owner2_rec, tradeNotes, years } =
    req.body;

  try {
    await Player.updateMany(
      { sleeperId: { $in: owner1_rec.players } },
      { $set: { owner: idMap.OwnerSleeperIdByName[owner1] } }
    );

    await Player.updateMany(
      { sleeperId: { $in: owner2_rec.players } },
      { $set: { owner: idMap.OwnerSleeperIdByName[owner2] } }
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
};

module.exports = {
  getAllTrades,
  createTrade,
};
