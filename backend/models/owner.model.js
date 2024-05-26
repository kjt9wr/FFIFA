const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: { type: String, required: true },
  cap: { type: Array, required: true },
  sleeperId: { type: String, required: true },
  penaltyFee: { type: Number },
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
