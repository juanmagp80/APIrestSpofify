const { Schema, model } = require("mongoose");

const SongSchema = Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
  },
  track: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    default: new Date(),
  },
});
