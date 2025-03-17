const router = require("express").Router();
const {
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
} = require("../controllers/player.controller");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

/*
 * Get Players
 */

// Get all players
router.route("/").get(getAllPlayers);

// Get all players with ownerID of query parameter
router.route("/roster/:ownerID").get(getRoster);

// Get all players for given position, ordered by rank
router.route("/position/:pos").get(getPlayersWithPosition);

// get all kept players
router.route("/keptPlayers").get(getKeptPlayers);

// get all rostered players
router.route("/rosteredPlayers").get(getRostereredPlayers);

// get all free agent players
router.route("/freeAgents").get(getAllFreeAgents);

// get all supermax players
router.route("/superMax").get(getSupermaxPlayers);

// get all players for given arbitration year
router.route("/arbitration/:year").get(getArbitratedPlayers);

// add player to db
router.route("/add").post(createNewPlayer);

router.route("/add/sleeperId").put(addSleeperId);

/*
 * Update Players
 */

// update a player based on request payload
router.route("/updatePlayer/:playerId").put(updatePlayer);

// Update player price
router.route("/updatePlayer/price/:sleeperId").put(updatePrice);

/*
 * Roster Routes
 */

// Remove all owners from all players - used when refreshing rosters in admin page
router.route("/removeAllOwners").post(removeAllOwners);

// Update roster with correct players
router.route("/update/roster/:ownerId").post(addPlayersToRoster);

module.exports = router;
