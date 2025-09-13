const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  sharedWith: {
    type: Array,
    default: [],
  },
  owner: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  storedName: {
    type: String,
    unique: true,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  inBin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model("File", FileSchema);
