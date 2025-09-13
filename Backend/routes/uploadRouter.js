const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const User = require("../models/User"); // ✅ Import User model
require("dotenv").config();

const uploadRouter = express.Router();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// ✅ Image Upload Route with MongoDB Storage
uploadRouter.post("/:userId", upload.single("file"), async (req, res) => {
  try {
    // 🛑 Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ Get uploaded file URL from Cloudinary
    const imageUrl = req.file.path;

    // ✅ Update user profile with new image URL
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl }, // Update profile picture field
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Image uploaded and saved successfully!", url: imageUrl, user: updatedUser });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = uploadRouter;
