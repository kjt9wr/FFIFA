const router = require("express").Router();
const {
  getAllNFLPlayers,
  getNFLPlayersByPosition,
  searchNFLPlayers,
  getNFLPlayerById,
} = require("../controllers/nflplayer.controller");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

/*
 * Get NFL Players
 */

// Get all NFL players
router.route("/").get(getAllNFLPlayers);

// Get NFL players by position
router.route("/position/:position").get(getNFLPlayersByPosition);

// Search NFL players by name
router.route("/search").get(searchNFLPlayers);

// Get NFL player by ID
router.route("/:playerId").get(getNFLPlayerById);

module.exports = router;
