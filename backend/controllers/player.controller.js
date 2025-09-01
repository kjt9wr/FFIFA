const Player = require("../models/player.model");
const idMap = require("../utils/idMaps.js");
/*
 * Get Players
 */

// Get all players
const getAllPlayers = async (req, res) => {
  Player.find()
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
};

// check id
// Get all players with ownerID of query parameter
const getRoster = async (req, res) => {
  Player.find({ owner: req.params.ownerID })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
};

// Get all players for given position, ordered by rank
const getPlayersWithPosition = async (req, res) => {
  Player.find({ position: req.params.pos })
    .then((data) => {
      res.send({ data: getAllPlayersOrderedByRank(data) });
    })
    .catch((err) => res.status(400).json("Unable to find player: " + err));
};

// get all kept players
const getKeptPlayers = async (req, res) => {
  Player.find({ keep: true })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
};

// get all rostered players
const getRostereredPlayers = (req, res) => {
  Player.find({ owner: { $nin: [null, ""] } })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
};

// get all free agent players
const getAllFreeAgents = async (req, res) => {
  Player.find({ keep: false })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
};

// get all supermax players
const getSupermaxPlayers = async (req, res) => {
  Player.find({ keeperClass: 3 })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
};

// get all players for given arbitration year
const getArbitratedPlayers = async (req, res) => {
  Player.find({ firstKeepYear: { $nin: [null, ""] } })
    .then((players) => res.json(players))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
};

// add player to db
const createNewPlayer = async (req, res) => {
  const { name, price, keep, position, rank, ownerName, sleeperId } = req.body;

  const newPlayer = new Player({});

  Player.create({
    name,
    price: Number(price),
    keep: Boolean(keep),
    position: position,
    rank: Number(rank),
    owner: idMap.OwnerSleeperIdByName[ownerName],
    sleeperId: sleeperId,
  })
    .then(() =>
      res.status(201).json({
        message: `${name} added!`,
        player: {
          name,
          price: Number(price),
          keep: Boolean(keep),
          position: position,
          rank: Number(rank),
          owner: idMap.OwnerSleeperIdByName[ownerName],
          sleeperId: sleeperId,
        },
      })
    )
    .catch((err) => res.status(400).json("Unable to add player: " + err));
};

const addSleeperId = async (req, res) => {
  Player.findOne({ name: req.body.name })
    .then((player) => {
      player.sleeperId = req.body.sleeperId;
      player
        .save()
        .then(() => res.json(player.name + " sleeperId updated!"))
        .catch((err) =>
          res.status(400).json("Unable to update player: " + err)
        );
    })
    .catch((err) => res.status(400).json("Unable to find player: " + err));
};

/*
 * Update Players
 */

// update a player based on request payload
const updatePlayer = async (req, res) => {
  await Player.updateOne({ sleeperId: req.params.playerId }, req.body)
    .then(res.status(200).json("Player updated"))
    .catch((err) => res.status(400).json("Unable to find player: ", err));
};

// update a player's price
const updatePrice = async (req, res) => {
  await Player.updateOne({ sleeperId: req.params.sleeperId }, req.body)
    .then(res.status(200).json("Player updated"))
    .catch((err) => res.status(400).json("Unable to find player: ", err));
};

/*
 * Roster Routes
 */

// Remove all owners from all players - used when refreshing rosters in admin page
const removeAllOwners = async (req, res) => {
  Player.updateMany({}, { $set: { owner: "" } }).then(() =>
    res.json("Updated!")
  );
};

const resetAllPrices = async (req, res) => {
  Player.updateMany({}, { $set: { price: 10 } }).then(() =>
    res.json("Updated!")
  );
};

// Update roster with correct players
const addPlayersToRoster = async (req, res) => {
  const { players } = req.body;
  Player.updateMany(
    {
      sleeperId: { $in: players },
    },
    {
      $set: { owner: req.params.ownerId },
    }
  ).then(() => res.json("Updated!"));
};

const getAllPlayersOrderedByRank = (playerList) => {
  return playerList
    .map((player) => {
      return {
        _id: player.id,
        sleeperId: player.sleeperId,
        name: player.name,
        rank: player.rank,
      };
    })
    .sort((a, b) => a.rank - b.rank);
};

module.exports = {
  getAllPlayers,
  getRoster,
  getPlayersWithPosition,
  getKeptPlayers,
  getRostereredPlayers,
  getAllFreeAgents,
  getSupermaxPlayers,
  getArbitratedPlayers,
  createNewPlayer,
  addSleeperId,
  updatePlayer,
  updatePrice,
  removeAllOwners,
  addPlayersToRoster,
  resetAllPrices,
};
