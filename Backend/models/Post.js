const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    likes: { type: [String], default: [] },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, default: "" },
    desc: { type: String, max: 1000, default: "" },
    likes: { type: [String], default: [] },
    comments: { type: [commentSchema], default: [] },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
