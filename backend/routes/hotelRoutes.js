const express = require("express");
const router = express.Router();
const {
    createHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
} = require("../controllers/hotelController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/multer");

// Public routes
router.get("/", getAllHotels);
router.get("/:id", getHotelById);

// Protected routes (admin only)
router.post("/", protect, upload.array("images, 5"), createHotel);
router.put("/:id", protect, upload.array("images", 5), updateHotel);
router.delete("/:id", protect, deleteHotel);

module.exports = router;