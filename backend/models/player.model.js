const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  keep: { type: Boolean, required: true },
  position: { type: String, required: true },
  franchise: {type: Boolean, required: true},
  owner:{}    
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;