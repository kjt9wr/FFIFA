const router = require("express").Router();

const {
  getAllTrades,
  createTrade,
} = require("../controllers/trade.controller");

// Get all trades
router.route("/").get(getAllTrades);

// Add a new trade
router.route("/add").post(createTrade);

module.exports = router;
