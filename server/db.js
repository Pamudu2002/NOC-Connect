const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db = mongoose.connection;

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Error connecting to database");
});

connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});