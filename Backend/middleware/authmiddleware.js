const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure you import the User model

const verifyAccessToken = (req, res, next) => {
  // Check for token in cookies or in the Authorization header
  const token =
    req.cookies.accessToken ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No access token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid or expired access token' });
    }
    req.user = user;
    next();
  });
};

const handleRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Check if the refresh token exists
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized: No refresh token provided' });
  }

  try {
    // Find the user associated with the refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: 'Forbidden: Invalid refresh token' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err || user._id.toString() !== decoded.id) {
        return res.status(403).json({ message: 'Forbidden: Invalid or expired refresh token' });
      }

      // Generate a new access token
      const accessToken = jwt.sign(
        { id: user._id, isLawyer: user.isLawyer },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // Access token expires in 15 minutes
      );

      // Set the new access token in a cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
        sameSite: 'strict',
        maxAge: 86400000 // 15 minutes in milliseconds
      });

      // Send the new access token in the response
      res.json({ accessToken });
    });
  } catch (err) {
    console.error('Error in handleRefreshToken:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { verifyAccessToken, handleRefreshToken };