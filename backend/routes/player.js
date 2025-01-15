const router = require("express").Router();
const Player = require("../models/player.model");
const idMap = require("../utils/idMaps.js");

/*
 * Get Players
 */

// Get all players
router.route("/").get((req, res) => {
  Player.find()
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

// Get all players with ownerID of query parameter
router.route("/roster/:ownerID").get((req, res) => {
  Player.find({ owner: req.params.ownerID })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

// Get all players for given position, ordered by rank
router.route("/position/:pos").get((req, res) => {
  Player.find({ position: req.params.pos })
    .then((data) => {
      res.send({ data: getAllPlayersOrderedByRank(data) });
    })
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

// get all kept players
router.route("/keptPlayers").get((req, res) => {
  Player.find({ keep: true })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

// get all rostered players
router.route("/rosteredPlayers").get((req, res) => {
  Player.find({ owner: { $nin: [null, ""] } })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

// get all free agent players
router.route("/freeAgents").get((req, res) => {
  Player.find({ keep: false })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

// get all supermax players
router.route("/superMax").get((req, res) => {
  Player.find({ keeperClass: 3 })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

// get all players for given arbitration year
router.route("/arbitration/:year").get((req, res) => {
  Player.find({ arbYear: req.params.year })
    .then((players) => res.json(players))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

// add player to db
router.route("/add").post((req, res) => {
  const name = req.body.name;

  const newPlayer = new Player({
    name,
    price: Number(req.body.price),
    keep: Boolean(req.body.keep),
    position: req.body.position,
    rank: Number(req.body.rank),
    owner: idMap.ownersIDByName[req.body.ownerName],
    sleeperId: req.body.sleeperId,
  });

  newPlayer
    .save()
    .then(() => res.json(`${name} added! ID: + '${newPlayer._id}': '${name}'`))
    .catch((err) => res.status(400).json("Unable to add player: " + err));
});

router.route("/add/sleeperId").put((req, res) => {
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
});

/*
 * Update Players
 */

// update a player based on request payload
router.route("/updatePlayer/:playerId").put(async (req, res) => {
  await Player.updateOne({ _id: req.params.playerId }, req.body)
    .then(res.status(200).json("Player updated"))
    .catch((err) => res.status(400).json("Unable to find player: ", err));
});

// Update a player's keeper price given a sleeper ID
router.route("/setPrice").put((req, res) => {
  Player.findOne({ sleeperId: req.body.sleeperId })
    .then((player) => {
      player.price = req.body.price;
      player
        .save()
        .then(() => res.json(player.name + " price updated!"))
        .catch((err) =>
          res.status(400).json("Unable to save player keeper price: " + err)
        );
    })
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

// update a player based on request payload
router.route("/updatePlayer/price/:sleeperId").put(async (req, res) => {
  await Player.updateOne({ sleeperId: req.params.sleeperId }, req.body)
    .then(res.status(200).json("Player updated"))
    .catch((err) => res.status(400).json("Unable to find player: ", err));
});

/*
 * Roster Routes
 */

// Remove all owners from all players - used when refreshing rosters in admin page
router.route("/removeAllOwners").post((req, res) => {
  Player.updateMany({}, { $set: { owner: "" } }).then(() =>
    res.json("Updated!")
  );
});

// Update roster with correct players
router.route("/update/roster/:ownerId").post((req, res) => {
  const playersToUpdate = req.body.players;
  Player.updateMany(
    {
      sleeperId: { $in: playersToUpdate },
    },
    {
      $set: { owner: req.params.ownerId },
    }
  ).then(() => res.json("Updated!"));
});

/*
 * Helper Routes - not used very often
 */

//reset all keeper classes
router.route("/reset/keeperClass").put((req, res) => {
  Player.find().then((player) => {
    player.keeperClass = 0;
    player
      .save()
      .then(() => res.json(player.name + " Keeper class updated!"))
      .catch((err) =>
        res.status(400).json("Unable to save keeper class : " + err)
      );
  });
});

// Get all players in the database without a sleeperId
router.route("/withoutSleeperId").get((req, res) => {
  Player.find({ sleeperId: null })
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json("Unable to find player: " + err));
});

const getAllPlayersOrderedByRank = (playerList) => {
  return playerList
    .map((player) => {
      return {
        _id: player.id,
        name: player.name,
        rank: player.rank,
      };
    })
    .sort((a, b) => a.rank - b.rank);
};

module.exports = router;
