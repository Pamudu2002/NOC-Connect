const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    education: [
      {
        school: String,
        degree: String,
        period: String,
        focus: String,
      },
    ],
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
