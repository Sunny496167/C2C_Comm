require("dotenv").config();
const express = require("express");
const postRouter = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for posts using multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "yourapp/posts",            // Change folder name as needed
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});

// Create a multer instance with a file size limit of 20 MB
const upload = multer({ storage });

// -----------------------------
// Create a Post Route with File Upload
// -----------------------------
postRouter.post("/", upload.single("file"), async (req, res) => {
  const newPost = new Post(req.body);

  // If a file is uploaded, multer provides req.file
  if (req.file) {
    // Cloudinary returns the secure URL in req.file.path and public_id in req.file.filename
    newPost.img = req.file.path;
    newPost.fileName = req.file.filename;
  }

  try {
    const savedPost = await newPost.save();
    const postUser = await User.findById(savedPost.userId);
    res.status(200).json({ 
      ...savedPost.toObject(), 
      profilePic: postUser?.profilePic 
    });
  } catch (err) {
    console.error("Error saving post:", err);
    res.status(500).json(err);
  }
});

// -----------------------------
// Update a Post
// -----------------------------
postRouter.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.body.userId) {
      await Post.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("You can update only your Posts");
    }
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json(err);
  }
});

// -----------------------------
// Delete a Post
// -----------------------------
postRouter.delete("/:id/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.params.userId) {
      await Post.deleteOne({ _id: req.params.id });
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("You can delete only your Posts");
    }
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json(err);
  }
});

// -----------------------------
// Like / Dislike a Post
// -----------------------------
postRouter.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("UnLiked");
    }
  } catch (err) {
    console.error("Error updating likes:", err);
    res.status(500).json(err);
  }
});

// -----------------------------
// Comment on a Post
// -----------------------------
postRouter.put("/addcomment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!req.body.userId || !req.body.comment) {
      return res.status(400).json({ error: "Missing comment userId or comment" });
    }
    await post.updateOne({ $push: { comments: req.body } });
    res.status(200).json("Comment Posted!");
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json(err);
  }
});

// -----------------------------
// Get a Post by ID (with comments processing)
// -----------------------------
postRouter.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const postUser = await User.findById(post.userId);
    const updatedComments = await Promise.all(
      post.comments.map(async (comment) => {
        const commentUser = await User.findById(comment.userId);
        return {
          ...comment.toObject(),
          profilePic: commentUser?.profilePic || null,
        };
      })
    );
    res.status(200).json({
      ...post.toObject(),
      profilePic: postUser?.profilePic || null,
      comments: updatedComments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// -----------------------------
// Get the Feed: Current User's Posts + Contacts' Posts
// -----------------------------
postRouter.get("/feed/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: user._id });
    const contactPosts = await Promise.all(
      user.contacts.map((contactId) => Post.find({ userId: contactId }))
    );
    const allPosts = userPosts.concat(...contactPosts).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const postsWithProfilePic = await Promise.all(
      allPosts.map(async (post) => {
        const postUser = await User.findById(post.userId);
        const updatedComments = await Promise.all(
          post.comments.map(async (c) => {
            if (!c.profilePic) {
              try {
                const commentUser = await User.findById(c.userId);
                return { ...c.toObject(), profilePic: commentUser?.profilePic };
              } catch (err) {
                console.error("Error fetching comment user for comment:", c, err);
                return c;
              }
            }
            return c;
          })
        );
        return { ...post.toObject(), profilePic: postUser?.profilePic, comments: updatedComments };
      })
    );
    res.status(200).json(postsWithProfilePic);
  } catch (err) {
    console.error("Error fetching feed:", err);
    res.status(500).json(err);
  }
});

// -----------------------------
// Timeline: Only Current User's Posts
// -----------------------------
postRouter.get("/timeline/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: user._id });
    res.status(200).json(userPosts);
  } catch (err) {
    console.error("Error fetching timeline:", err);
    res.status(500).json(err);
  }
});

module.exports = postRouter;
