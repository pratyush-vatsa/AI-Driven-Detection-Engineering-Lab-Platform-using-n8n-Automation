// backend/models/Scan.js
const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  // Link to the user who ran the scan
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // This creates a reference to the User model
  },
  scanType: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  // Store the report content directly
  markdownReport: {
    type: String,
    required: true
  },
  // You could also store a filename if reports are on disk
  // reportFilename: { type: String }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

module.exports = mongoose.model('Scan', scanSchema);