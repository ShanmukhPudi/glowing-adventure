const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

//To load .env before anything else reads it
dotenv.config();

connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json()); //Parses incoming JSON requests
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Basic test route
app.get('/',(req,res) => {
    res.send('MERN Backend is running!');
});

/*Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(
    () => console.log('MongoDB Connected')
).catch(err => console.log(err));
*/

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[[DEBUG]] : Server running on port ${PORT}`));