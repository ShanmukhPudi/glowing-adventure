const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

// @route   POST /api/bookings
// @access  Private (logged in users)
const createBooking = async (req, res) => {
  try {
    const { hotelId, roomsBooked } = req.body;

    // Validate that roomsBooked is a positive number
    if (!roomsBooked || roomsBooked < 1) {
      return res.status(400).json({ message: "Must book at least 1 room" });
    }

    // Find the hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Check if enough rooms are available
    if (hotel.availableRooms < roomsBooked) {
      return res.status(400).json({
        message: `Only ${hotel.availableRooms} room(s) available`,
      });
    }

    // Create the booking
    const booking = await Booking.create({
      user: req.user._id,   // comes from protect middleware
      hotel: hotelId,
      roomsBooked,
    });

    // Reduce available rooms in the hotel
    hotel.availableRooms -= roomsBooked;
    await hotel.save();

    // Populate and return the booking with user and hotel details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email")
      .populate("hotel", "name location pricePerNight");

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/bookings/my
// @access  Private (logged in users)
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("hotel", "name location pricePerNight images")
      .sort({ createdAt: -1 }); // newest booking first

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/bookings
// @access  Private (Admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("hotel", "name location")
      .sort({ createdAt: -1 }); // newest booking first

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings };