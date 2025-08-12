// backend/routes/scans.js
const express = require('express');
const Scan = require('../models/Scan');
const auth = require('../middleware/auth'); // We must protect these routes
const router = express.Router();

// --- GET /api/scans ---
// Fetches a list of all historical scans for the logged-in user.
router.get('/scans', auth, async (req, res) => {
  try {
    // Find all scans that belong to the user ID from the JWT token.
    // We only select the fields needed for the history table, NOT the full report.
    const scans = await Scan.find({ userId: req.user.userId })
                            .select('_id scanType startTime endTime')
                            .sort({ createdAt: -1 }); // Show the newest scans first

    res.json(scans);
  } catch (err) {
    res.status(500).send('Error fetching scan history.');
  }
});

// --- GET /api/scans/:id/report ---
// Fetches the full markdown report for a single scan.
router.get('/scans/:id/report', auth, async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);

    // **CRUCIAL SECURITY CHECK:**
    // Ensure the scan exists AND that the user requesting it is the one who owns it.
    // This prevents one user from accessing another user's report by guessing the ID.
    if (!scan || scan.userId.toString() !== req.user.userId) {
      return res.status(404).send('Scan report not found.');
    }

    // Send the markdown content as JSON.
    res.json({ markdownReport: scan.markdownReport });
  } catch (err) {
    res.status(500).send('Error fetching scan report.');
  }
});

module.exports = router;