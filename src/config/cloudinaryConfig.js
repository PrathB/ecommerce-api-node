const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce-products", 
    allowedFormats: ["jpg", "png", "jpeg"], 
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// Initialize Multer
const upload = multer({ storage: storage });

module.exports = { upload, cloudinary };
