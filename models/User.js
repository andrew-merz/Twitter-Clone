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
  profilePic: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdpRvftRBgfCbvzOHB0bANVih3QvZD-xZ4flbABUFGDctmaY87ajkJD5RhdvVcyZvkS7U&usqp=CAU'
  },
  tweets: {
    type: mongoose.Types.ObjectId,
    ref: "Tweet",
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
