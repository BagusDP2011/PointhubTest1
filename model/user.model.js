const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  accessToken: {
    type: String,
    allowNull: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
