const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  keep: { type: Boolean, required: true },
  position: { type: String, required: true },
  superMax: {
    plan: {type: Number, required: false},
    year: {type: Number, required: false}
  },
  rank: { type: Number, required: false },
  keeperClass: {type: Number, required:false},
  owner:{},
  arbYear: {type: String, required: false}
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
