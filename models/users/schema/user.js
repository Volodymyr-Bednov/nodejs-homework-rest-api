const { Schema, model } = require("mongoose");

const users = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  avatarURL: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const User = model("user", users);

module.exports = User;
