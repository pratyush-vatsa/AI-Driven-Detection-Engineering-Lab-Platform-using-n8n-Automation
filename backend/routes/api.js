// backend/routes/api.js
const express = require('express');
const fetch = require('node-fetch');
const auth = require('../middleware/auth');
const Scan = require('../models/Scan');
const router = express.Router();

router.post('/scan', auth, async (req, res) => {
    try {
        const { target, scanType } = req.body;
        const startTime = new Date();

        const response = await fetch(process.env.N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ target, scanType })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`n8n workflow failed: ${errorText}`);
        }

        // --- THIS IS THE CORRECTED LOGIC ---
        // 1. Parse the JSON object from the n8n response.
        const n8nData = await response.json();

        // 2. Extract the markdown string from the 'markdownReport' key.
        const markdownReport = n8nData.markdownReport;
        
        const endTime = new Date();

        // 3. Now, save the CLEAN markdown string to the database.
        const newScan = new Scan({
            userId: req.user.userId,
            scanType: scanType,
            startTime: startTime,
            endTime: endTime,
            markdownReport: markdownReport // This is now just the markdown, not the JSON string
        });

        await newScan.save();

        res.status(201).json({ message: 'Scan completed and report saved.' });

    } catch (error) {
        console.error("Scan error:", error);
        res.status(500).send('Error triggering or saving scan.');
    }
});

// The old PDF route is no longer needed because we are using client-side printing.
// You can safely delete it to keep your backend code clean.
/*
router.post('/report/pdf', auth, (req, res) => {
    // ... This logic is now obsolete
});
*/

module.exports = router;