const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },

        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
            required: [true, "Hotel is required"],
        },

        roomsBooked: {
            type: Number,
            required: [true, "Number of rooms is required"],
            min: [1, "Please select a room to book"],
        },

    },      {
            timestamps: true,
        },
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;