const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Hotel name is required"],
            trim: true,
        },

        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },

        pricePerNight: {
            type: Number,
            required: [true, "Price per night is required"],
            min: [0, "Price cannot be negative"]
        },

        availableRooms: {
            type: Number,
            required: [true, "Available room count is required"],
            min: [0, "Price cannot be negative"],
        },
        
        images: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;