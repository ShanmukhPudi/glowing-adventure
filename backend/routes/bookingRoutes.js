const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getAllBookings,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

// All booking routes require login
router.post("/", protect, createBooking);         // User books a hotel
router.get("/my", protect, getMyBookings);        // User views their bookings
router.get("/", protect, getAllBookings);          // Admin views all bookings

module.exports = router;