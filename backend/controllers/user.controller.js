const User = require("../models/user.model");

// login user

const loginUser = async (req, res) => {
  res.json({ msg: "login user" });
};

module.exports = { loginUser };
