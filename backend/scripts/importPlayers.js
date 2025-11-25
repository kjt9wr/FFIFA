const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const NFLPlayer = require("../models/nflplayer.model");

async function importPlayersData() {
  try {
    // Connect to MongoDB
    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri, {});
    console.log("Connected to MongoDB");

    // Read the JSON file
    const filePath = path.join(
      __dirname,
      "../../frontend/src/utilities/All_Players-1745377597264.json"
    );
    const jsonData = fs.readFileSync(filePath, "utf8");
    const playersObject = JSON.parse(jsonData);

    // Convert object to array and extract only needed fields
    const playersArray = Object.values(playersObject)
      .filter((player) => player.player_id && player.full_name)
      .map((player) => ({
        player_id: player.player_id,
        full_name: player.full_name,
        position: player.position || null,
      }));

    console.log(`Found ${playersArray.length} players to import`);

    // Clear existing data (optional - remove if you want to preserve existing data)
    await NFLPlayer.deleteMany({});
    console.log("Cleared existing NFL player data");

    // Insert new data
    const result = await NFLPlayer.insertMany(playersArray);
    console.log(`Successfully imported ${result.length} players`);

    process.exit(0);
  } catch (error) {
    console.error("Error importing players:", error);
    process.exit(1);
  }
}

importPlayersData();
