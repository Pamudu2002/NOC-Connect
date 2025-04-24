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
    loacation: {
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

    // name: {
    //   type: String,
    //   required: true,
    // },
    // achievements: [{
    //   title: String,
    //   description: String,
    //   date: String,
    //   icon: String,
    //   image: String
    // }],
    // socialMedia: {
    //   twitter: String,
    //   twitch: String,
    //   youtube: String
    // },
    // email: {
    //   type: String,
    //   required: true
    // },
    // profilePicture: {
    //   type: String
    // }
  },
  { timestamps: true }
);

const athleteModel = mongoose.model('athletes',athleteSchema);
module.exports = athleteModel;
