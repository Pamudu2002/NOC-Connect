const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
    default: 'No experience',
  },
}, { timestamps: true });

const volunteerModel = mongoose.model('volunteers', volunteerSchema);

module.exports = volunteerModel;
