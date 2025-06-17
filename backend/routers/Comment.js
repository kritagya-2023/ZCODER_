const express = require('express');
const router = express.Router();
const CommentDB = require('../models/Comment');

// Add a new comment to a question
router.post('/:id', async (req, res) => {
    try {
        const comment = new CommentDB({
            question: req.params.id,           // changed from question_id
            content: req.body.comment,         // changed from comment
            userInfo: req.body.user            // changed from user
        });

        await comment.save();
        res.status(201).json({
            status: true,
            message: "Comment added successfully"
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Error adding comment"
        });
    }
});

module.exports = router;