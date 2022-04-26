const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "ex. abc123@gmail.com"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please create a password"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
