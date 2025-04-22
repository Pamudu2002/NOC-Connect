const express = require('express');
const db = require('./db');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const eventRoute = require('./routes/event.route');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware

app.use(express.json());

app.use(cors({
  // origin: `*`, 
  origin: `http://localhost:3000`, 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/api/events', eventRoute);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

