const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json()); //Parses incoming JSON requests

//Basic test route
app.get('/',(req,res) => {
    res.send('MERN Backend is running!');
});

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(
    () => console.log('MongoDB Connected')
).catch(err => console.log(err));

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[[DEBUG]] : Server running on port ${PORT}`));