const multer = require("multer");
const path = require("path");

// Define where and how to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files to the uploads folder
  },
  filename: function (req, file, cb) {
    // Give each file a unique name to prevent overwriting
    const uniqueName = `hotel-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only jpeg, jpg, png and webp images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per image
});

module.exports = upload;