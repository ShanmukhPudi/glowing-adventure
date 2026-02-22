const Hotel = require("../models/Hotel");

// @route   POST/api/hotels
// @access  Private (admin only)

const createHotel = async(req, res) => {
    try{
        const { name, location, description, pricePerNight, availableRooms } = req.body;

        // req.files contains the uploaded images from multer
        const images = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

        const hotel = await Hotel.create({
            name,
            location,
            description, pricePerNight,
            availableRooms,
            images,
        });

        res.status(201).json(hotel);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

// @route   GET/api/hotels
// @access  Public
const getAllHotels = async (req, res) => {
    try{
        const {search} = req.query;

        // if a search query exists, filter by name or location
        const filter = search
        ?{
            $or: [{name: { $regex: search, $option: "i"}}, {location: { $regex: search, $options:"i"}},]
        }
        :{};

        const hotels = await Hotel.find(filter);
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET/api/hotels/:id
// @access  Public
const getHotelById = async (req, res) => {
    try{
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found"});
        }

        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// @route   PUT/api/hotels/:id
// @access  Private (Admin only)
const updateHotel = async (req, res) => {
    try{
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel){
            return res.status(404).json({ message: "Hotel not found"});
        }

        const { name, location,description, pricePerNight, availableRooms } = req.body;

        // If new images are uploaded use them, else keep existing images
        const images = req.files && req.files.length > 0 
            ? req.files.map((file) => `/uploads/${file.filename}`) : hotel.images;

        hotel.name = name || hotel.name;
        hotel.location = location || hotel.location;
        hotel.description = description || hotel.description;
        hotel.pricePerNight = pricePerNight || hotel.pricePerNight;
        hotel.availableRooms = availableRooms || hotel.availableRooms;
        hotel.images = images;

        const updatedHotel = await hotel.save();
        res.status(200).json(updatedHotel);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

// @route   DELETE/api/hotels/:id
// @access  Private (admin only)
const deleteHotel = async (req, res) => {
    try{
        const hotel = await Hotel.findById(req.params.id);

        if(!hotel){
            return res.status(404).json({ message: "Hotel not found"});
        }

        await hotel.deleteOne();
        res.status(200).json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
};