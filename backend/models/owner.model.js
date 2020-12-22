const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: { type: String, required: true },
  cap: { type: Array, required: true }
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;