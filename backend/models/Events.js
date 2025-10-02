const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
  type: String,
  enum: [
    "concert",
    "seminar",
    "sports",
    "movie",
    "expos",
    "festivals",
    "conferences",
    "observances",
    "community",
    "other"
  ],
  default: "other",
},

  date: Date,
  description: String,
  imageUrl: String,
  location: {
    name: { type: String, required: true }, // ✅ Human-readable name
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
});

eventSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Event", eventSchema);
