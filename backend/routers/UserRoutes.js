const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user if not exists
router.post('/create', async (req, res) => {
    const { uid, bio } = req.body;

    try {
        let user = await User.findOne({ uid });
        if (!user) {
            user = new User({ uid, bio });
            await user.save();
            return res.status(201).json({ status: true });
        }
        res.status(200).json({ status: true, message: "User already exists" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: false, message: "Error creating user" });
    }
});

// Get user bio by uid
router.get('/bio', async (req, res) => {
    try {
        const { uid } = req.query;
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user.bio);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error occurred");
    }
});

// Update user bio
router.put('/update', async (req, res) => {
    try {
        const { uid, bio } = req.body;
        await User.findOneAndUpdate({ uid }, { bio }, { new: true });
        res.status(200).json({ message: "Bio updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;