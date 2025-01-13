const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tradeSchema = new Schema({
  owner1: {},
  owner2: {},
  owner1_rec: { type: Object, required: true },
  owner2_rec: { type: Object, required: true },
  tradeNotes: { type: String, requried: false },
  years: { type: Array },
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
