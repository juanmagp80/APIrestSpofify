const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nick: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
    default: "default.jpg",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  deleted_at: {
    type: Date,
    default: null,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("User", userSchema, "users");
