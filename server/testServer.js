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
  // origin: `*`, 
  origin: `http://localhost:3000`, 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



app.get('/', (req, res) => {
  res.send('Hello World!');
});