const { Schema, model } = require("mongoose");

const AlbumSchema = Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "default.png",
  },
  created_at: {
    type: String,
    default: new Date(),
  },
});

module.exports = model("Album", AlbumSchema, "albums");
