const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nflPlayerSchema = new Schema({
  player_id: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  position: { type: String, required: false },
});

const NFLPlayer = mongoose.model("NFLPlayer", nflPlayerSchema);

module.exports = NFLPlayer;
