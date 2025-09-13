const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { verifyAccessToken } = require('../middleware/authmiddleware'); // Import the middleware
const userRouter = express.Router();

// Protect routes that require authentication
userRouter.use(verifyAccessToken);

// Update User
userRouter.put('/:id', async (req, res) => {
    if (req.user.id !== req.params.id && !req.user.isAdmin) {
        return res.status(403).json({ message: 'You can update only your account' });
    }

    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            return res.status(500).json({ message: 'Failed to hash password', error: err.message });
        }
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
});

// Delete User
userRouter.delete('/:id', async (req, res) => {
    if (req.user.id !== req.params.id && !req.user.isAdmin) {
        return res.status(403).json({ message: 'You can delete only your account' });
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
});

// Get a User
userRouter.get('/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const currentUser = await User.findById(req.user.id);
      
      // Updated pending check logic
      const isRequestSent = currentUser.sentContact.some(id => 
        id.equals(req.params.userId)
      );
  
      const { password, updatedAt, isAdmin, ...others } = user._doc;
      res.status(200).json({ ...others, isRequestSent });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
  });

// Get Contacts
userRouter.get('/contacts/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const contacts = await Promise.all(
            user.contacts.map(async (contactId) => {
                const contact = await User.findById(contactId);
                return {
                    _id: contact._id,
                    firstname: contact.firstname,
                    lastname: contact.lastname,
                    isLawyer: contact.isLawyer,
                    profilePic: contact.profilePic ? `/uploads/${contact.profilePic}` : null,
                };
            })
        );

        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch contacts', error: err.message });
    }
});

// Connect User
userRouter.put('/:id/requestConnect', async (req, res) => {
    if (req.user.id === req.params.id) {
        return res.status(403).json({ message: "You can't follow yourself" });
    }

    try {
        const user = await User.findById(req.user.id);
        const to_user = await User.findById(req.params.id);

        if (!to_user.contacts.includes(req.user.id)) {
            await to_user.updateOne({ $push: { pendingContacts: { contactorId: req.user.id, seen: false } }});
            await user.updateOne({ $push: { sentContact: req.params.id } });
            res.status(200).json({ message: 'Request Sent!' });
        } else {
            res.status(403).json({ message: 'Already connected' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to send request', error: err.message });
    }
});
 
// Accept Connection
userRouter.put('/:id/acceptConnect', async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Current user (acceptor)
        const contactor = await User.findById(req.params.id); // User who sent the request

        if (user.contacts.includes(contactor._id)) {
            return res.status(403).json({ message: 'Already connected' });
        }

        // Add to each other's contacts
        await user.updateOne({ $push: { contacts: contactor._id } });
        await contactor.updateOne({ $push: { contacts: user._id } });

        // Remove from pending and sent
        await user.updateOne({ $pull: { pendingContacts: { contactorId: contactor._id } } });
        await contactor.updateOne({ $pull: { sentContact: user._id } });

        res.status(200).json({ message: 'Request Accepted!' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to accept request', error: err.message });
    }
});

// Disconnect User
userRouter.put('/:id/deleteConnect', async (req, res) => {
    if (req.user.id === req.params.id) {
        return res.status(403).json({ message: "You can't disconnect yourself" });
    }

    try {
        const user = await User.findById(req.user.id);
        const to_user = await User.findById(req.params.id);

        if (to_user.contacts.includes(req.user.id)) {
            await to_user.updateOne({ $pull: { contacts: req.user.id } });
            await user.updateOne({ $pull: { contacts: req.params.id } });
            res.status(200).json({ message: 'Connection Deleted!' });
        } else {
            res.status(403).json({ message: 'Not connected' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete connection', error: err.message });
    }
});

// Add to userRouter.js

// Withdraw connection request
userRouter.put('/:id/withdrawRequest', async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const targetUser = await User.findById(req.params.id);
  
      await user.updateOne({ $pull: { sentContact: req.params.id } });
      await targetUser.updateOne({ 
        $pull: { pendingContacts: { contactorId: req.user.id } } 
      });
  
      res.status(200).json({ message: 'Request withdrawn' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Decline connection request
  userRouter.put('/:id/declineConnect', async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const contactor = await User.findById(req.params.id);
  
      await user.updateOne({ 
        $pull: { pendingContacts: { contactorId: req.params.id } } 
      });
      await contactor.updateOne({ $pull: { sentContact: req.user.id } });
  
      res.status(200).json({ message: 'Request declined' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Search for Lawyers
// Search for Lawyers
userRouter.post('/search/lawyers', async (req, res) => {
    try {
        const { name, city } = req.body;
        const regex = new RegExp(name, 'i');

        const query = city
            ? { firstname: regex, isLawyer: true, 'geoLocation.city': city }
            : { firstname: regex, isLawyer: true };

        const users = await User.find(query);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to search lawyers', error: err.message });
    }
});

// Search for Users
userRouter.post('/search/users', async (req, res) => {
    try {
        const { firstname, lastname } = req.body;
        const regexFirstname = new RegExp(firstname, 'i');
        const regexLastname = new RegExp(lastname, 'i');

        const users = await User.find({ firstname: regexFirstname, lastname: regexLastname });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to search users', error: err.message });
    }
});

// Rate a User
userRouter.put('/rate/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingRating = user.rating.find((r) => r.userId === req.user.id);
        if (existingRating) {
            existingRating.rating = req.body.rating;
        } else {
            user.rating.push({ userId: req.user.id, rating: req.body.rating });
        }

        await user.save();
        res.status(200).json({ message: 'Rating updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update rating', error: err.message });
    }
});

module.exports = userRouter;