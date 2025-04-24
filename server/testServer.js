const express = require('express');
const dbconfig = require('./db.js');
const cors = require('cors');
const chatRoute = require('./routes/chat.route');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 5000;


app.use(express.json()); 

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api/chat',chatRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});