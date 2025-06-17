const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch upcoming Codeforces contests
router.get('/codeforces', async (req, res) => {
    try {
        const { data } = await axios.get('https://codeforces.com/api/contest.list');
        const upcoming = data.result.filter(item => item.phase === 'BEFORE');
        res.json(upcoming);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Codeforces contests' });
    }
});

module.exports = router;