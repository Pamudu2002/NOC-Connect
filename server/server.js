const express = require('express');
const db = require('./db');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const eventRoute = require('./routes/event.route');
const athleteRoute = require('./routes/athlete.route');
const userRoute = require('./routes/user.route')
const chatRoute = require('./routes/chat.route');

const cookieParser = require('cookie-parser');

const volunteerRoute = require('./routes/volunteer.route');
const achievementRoute = require('./routes/achievement.route');




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
app.use(cookieParser());

app.use('/api/events', eventRoute);
app.use('/api/athletes', athleteRoute);
app.use('/api/users', userRoute);
app.use('/api/volunteers', volunteerRoute);
app.use('/api/achievements', achievementRoute);
app.use('/api/chat',chatRoute);


app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

