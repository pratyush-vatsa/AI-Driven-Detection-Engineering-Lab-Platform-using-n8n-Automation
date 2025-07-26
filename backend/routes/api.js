// backend/routes/api.js
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const PDFDocument = require('pdfkit');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/scan', auth, async (req, res) => {
    const { target, scanType } = req.body;
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, scanType })
    });
    const result = await response.json();
    res.json(result);
});

router.post('/report/pdf', auth, (req, res) => {
    const { reportData } = req.body;
    const doc = new PDFDocument();
    let filename = `report-${Date.now()}.pdf`;
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-type', 'application/pdf');
    doc.fontSize(25).text('Penetration Test Report', { align: 'center' });
    doc.fontSize(12).text(JSON.stringify(reportData, null, 2));
    doc.pipe(res);
    doc.end();
});

module.exports = router;