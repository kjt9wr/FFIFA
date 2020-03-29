const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: { type: String, required: true },
  cap: { type: Array, required: true },
  roster: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    keep: { type: Boolean, required: true },
    position: { type: String, required: true }
  }]
    
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;