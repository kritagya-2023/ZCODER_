const express = require('express');
const router = express.Router();
const AnswerDB = require('../models/Answer');

// Add a new answer
router.post('/', async (req, res) => {
    try {
        const answer = new AnswerDB({
            question: req.body.question,         // changed from question_id
            content: req.body.content,           // changed from answer
            userInfo: req.body.userInfo          // changed from user
        });

        const savedAnswer = await answer.save();
        res.status(201).json({
            status: true,
            data: savedAnswer
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Error adding answer"
        });
    }
});

module.exports = router;