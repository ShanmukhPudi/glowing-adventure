const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

//To load .env before anything else reads it
dotenv.config();

connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json()); //Parses incoming JSON requests
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
// Multer error handler — must be after all routes
app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  res.status(500).json({ message: err.message });
});

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