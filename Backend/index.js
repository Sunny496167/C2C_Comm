require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json({ limit: "50mb" }));         // or a limit that fits your needs
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json()); // Parse JSON bodies
app.use(morgan("common")); // Logging
app.use(helmet()); // Security headers
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/conversation', require('./routes/conversation'));
app.use('/api/message', require('./routes/message'));
app.use('/api/upload', require('./routes/uploadRouter'));
app.use('/api/files', require('./routes/files'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
