const NFLPlayer = require("../models/nflplayer.model");

// Get all NFL players
const getAllNFLPlayers = async (req, res) => {
  try {
    const players = await NFLPlayer.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get NFL players by position
const getNFLPlayersByPosition = async (req, res) => {
  try {
    const position = req.params.position;
    const players = await NFLPlayer.find({ position: position });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search NFL players by name
const searchNFLPlayers = async (req, res) => {
  try {
    const searchTerm = req.query.name;
    const players = await NFLPlayer.find({
      full_name: { $regex: searchTerm, $options: "i" },
    });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get NFL player by ID
const getNFLPlayerById = async (req, res) => {
  try {
    const player = await NFLPlayer.findOne({ player_id: req.params.playerId });
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNFLPlayers,
  getNFLPlayersByPosition,
  searchNFLPlayers,
  getNFLPlayerById,
};
