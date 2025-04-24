const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    sponsorshipBudget: Number,
    interests: [String],
  },
  { timestamps: true }
);

const sponsorModel = mongoose.model("sponsors", sponsorSchema);
module.exports = sponsorModel;
