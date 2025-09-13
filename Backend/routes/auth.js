  
  const authRouter = require('express').Router();
  const User = require('../models/User');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  const { v4: uuidv4 } = require('uuid');
  const sendEmail = require("../config/config.js");
  
  // Register Route
  authRouter.post('/register', async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging line

        if (!req.body.emailId) {
            return res.status(400).json({ message: 'Email ID is required' });
        }

        const tempUser = await User.findOne({ emailId: req.body.emailId });
        if (tempUser) return res.status(400).json({ message: 'Email ID already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hashedPassword,
            confirmationCode: uuidv4(),
            status: 'Pending'
        });

        const user = await newUser.save();

        try {
            await sendEmail(user.firstname, user.emailId, user.confirmationCode);
            res.status(200).json({ message: "Check your email to verify your account!" });
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            res.status(500).json({ message: "Failed to send confirmation email" });
        }
    } catch (err) {
        console.error("Error in /register:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

  
  // Email Confirmation Route
  authRouter.get('/confirm/:confirmationCode', async (req, res) => {
      try {
          const user = await User.findOne({ confirmationCode: req.params.confirmationCode });
          if (!user) return res.status(404).json({ message: "User not found" });
  
          user.status = "Active";
          await user.save();
          res.status(200).json({ message: 'Email verified successfully!' });
      } catch (err) {
          res.status(500).json({ message: 'Server error' });
      }
  });
  
  // Login Route
authRouter.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ emailId: req.body.emailId });
      if (!user) return res.status(404).json({ message: "Invalid credentials" });
  
      if (user.status !== "Active") {
        return res.status(401).json({ message: "Please verify your email!" });
      }
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });
  
      // Add this line to extract user data
      const { password, refreshToken, ...userData } = user._doc;
  
      const accessToken = jwt.sign(
        { id: user._id, isLawyer: user.isLawyer },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      const newRefreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_SECRET,
        { expiresIn: '7d' }
      );
  
      // Update user with new refresh token
      user.refreshToken = newRefreshToken;
      await user.save();
  
      res.cookie('accessToken', accessToken, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 900000
      });
      
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 604800000
      });
  
      res.status(200).json({ userData, token: accessToken });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Logout Route
authRouter.post('/logout', async (req, res) => {
    const { refreshToken } = req.cookies;
    
    // Clear tokens from database
    if (refreshToken) {
      await User.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
      );
    }
  
    res
      .clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      .status(200)
      .json({ message: 'Successfully logged out' });
  });
  
  module.exports = authRouter;