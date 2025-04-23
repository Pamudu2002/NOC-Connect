const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    achievements: [String],
    bio: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    birthPlace: String,
    birthCountry: String,
    nationility: String,
    height: Number,
    weight: Number,
  },
  { timestamps: true }
);

const athleteModel = mongoose.model('athletes',athleteSchema);
module.exports = athleteModel;
