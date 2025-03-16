require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const ownerRouter = require("./routes/owner");
const playerRouter = require("./routes/player");
const tradeRouter = require("./routes/trade");
const userRoutes = require("./routes/user");

// express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${req.method}] `, req.path);
  next();
});

// Handle DB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
app.use("/owner", ownerRouter);
app.use("/player", playerRouter);
app.use("/trade/", tradeRouter);
app.use("/user", userRoutes);

// listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
