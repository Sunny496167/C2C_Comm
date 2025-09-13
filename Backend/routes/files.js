const express = require('express');
const filesRouter = express.Router();
const User = require('../models/User');
const File = require('../models/File');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage for general file uploads
const fileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const userId = req.body.userId || 'default';
    // Set resource_type based on mimetype: if video, then use "video", else "auto" (or "image")
    let resource_type = file.mimetype.startsWith('video/') ? 'video' : 'auto';
    return {
      folder: `yourapp/${userId}`,
      allowedFormats: ["jpg", "png", "jpeg", "webp", "pdf", "mp4", "mov", "3gp", "doc", "docx"],
      resource_type, // Cloudinary will now know how to process the file
    };
  },
});

const fileUpload = multer({ storage: fileStorage });

// Set up Cloudinary storage for profile picture uploads
const profilePicStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'yourapp/profilePics',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});
const profilePicUpload = multer({ storage: profilePicStorage });

// GET all file objects (non-bin) for a user
filesRouter.post('/', async (req, res) => {
  try {
    const fileObjects = await File.find({ owner: req.body.userId, inBin: false });
    res.status(200).send(fileObjects);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Redirect client to the Cloudinary URL
filesRouter.get('/:userId/:storedName', async (req, res) => {
  try {
    const fileObj = await File.findOne({ storedName: req.params.storedName });
    if (!fileObj) return res.status(404).json({ error: "File not found" });
    if (fileObj.owner === req.params.userId || (fileObj.sharedWith && fileObj.sharedWith.includes(req.params.userId))) {
      res.redirect(fileObj.url);
    } else {
      res.status(401).json({ error: "Cannot access this file!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a file object via shared route using _id
filesRouter.get('/shared/:userId/:fileId', async (req, res) => {
  try {
    const fileObj = await File.findById(req.params.fileId);
    if (fileObj && (fileObj.owner === req.params.userId || (fileObj.sharedWith && fileObj.sharedWith.includes(req.params.userId)))) {
      res.status(200).json(fileObj);
    } else {
      res.status(401).json({ error: "Cannot access this file!" });
    }
  } catch (err) {
    res.status(500).json({ error: 'Invalid' });
  }
});

// Upload a file using Cloudinary and multer
filesRouter.post('/fileUpload', fileUpload.single("file"), async (req, res) => {
  const userId = req.body.userId;
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
  const newFile = new File({
    owner: userId,
    fileName: req.file.originalname,
    storedName: req.file.filename,  // Cloudinary public_id
    url: req.file.path,             // Secure URL from Cloudinary
    createdAt: new Date(),
    inBin: false,
  });
  
  try {
    const savedFile = await newFile.save();
    res.status(200).json(savedFile);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get directory size (stubbed)
filesRouter.post('/directorySize', async (req, res) => {
  res.status(200).json({ size: 0 });
});

// Update the shared list for a file
filesRouter.put('/shared/', async (req, res) => {
  try {
    const file = await File.findById(req.body.fileId);
    if (file.owner === req.body.userId) {
      await file.updateOne({ $set: { sharedWith: req.body.sharedWith } });
      res.status(200).json(file);
    } else {
      res.status(401).json({ error: 'Unauthorized access' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get files in bin
filesRouter.post('/bin', async (req, res) => {
  try {
    const fileObjects = await File.find({ owner: req.body.userId, inBin: true });
    res.status(200).send(fileObjects);
  } catch (err) {
    res.status(500).json(err);
  }
});

// "Delete" a file by moving it to the bin (flag update)
filesRouter.post('/delete/:fileName', async (req, res) => {
  try {
    const file = await File.findOne({ storedName: req.params.fileName });
    if (file && file.owner === req.body.userId) {
      file.inBin = true;
      await file.save();
      res.status(200).json(file);
    } else {
      res.status(401).json({ error: "Unauthorized access" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Restore a file from the bin
filesRouter.post('/bin/:fileName', async (req, res) => {
  try {
    const file = await File.findOne({ storedName: req.params.fileName });
    if (file && file.owner === req.body.userId) {
      file.inBin = false;
      await file.save();
      res.status(200).json(file);
    } else {
      res.status(401).json({ error: "Unauthorized access" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Permanently delete a file from Cloudinary and the DB
filesRouter.delete('/permanentDelete', async (req, res) => {
  try {
    const { fileId, userId } = req.query;
    if (!fileId || !userId) return res.status(400).json({ error: 'Missing fileId or userId' });
    
    const fileObj = await File.findById(fileId);
    if (!fileObj) return res.status(404).json({ error: 'File not found' });
    if (fileObj.owner.toString() !== userId) return res.status(403).json({ error: 'Unauthorized' });
    
    cloudinary.uploader.destroy(fileObj.storedName, async (error, result) => {
      if (error) return res.status(500).json(error);
      await fileObj.deleteOne();
      res.status(200).send('Deleted!');
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload a profile picture using Cloudinary and multer
filesRouter.post('/uploadProfilePic', profilePicUpload.single("file"), async (req, res) => {
  const userId = req.body.userId;
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
  const profilePic = req.file.path;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { profilePic } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ profilePic });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get profile pic – redirect using URL stored in user record
filesRouter.get('/get/profilePic/:fileName', async (req, res) => {
  try {
    const user = await User.findOne({ profilePic: req.params.fileName });
    if (user) {
      res.redirect(user.profilePic);
    } else {
      res.status(404).json({ error: 'Profile pic not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = filesRouter;
