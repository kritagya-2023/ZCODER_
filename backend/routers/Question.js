const express = require('express');
const router = express.Router();
const QuestionDB = require('../models/Question');
const mongoose = require('mongoose');

// Add a new question
router.post('/', async (req, res) => {
    try {
        const question = new QuestionDB({
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
            userInfo: req.body.userInfo
        });

        const savedQuestion = await question.save();
        res.status(201).json({
            status: true,
            data: savedQuestion
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Error adding question"
        });
    }
});

// Get all questions with comments and answers
router.get('/', async (req, res) => {
    try {
        const questions = await QuestionDB.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "question",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "answers",
                    localField: "_id",
                    foreignField: "question",
                    as: "answerDetails"
                }
            },
            {
                $project: {
                    __v: 0
                }
            }
        ]);
        res.status(200).json(questions);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

// Get a single question by ID with comments and answers
router.get('/:id', async (req, res) => {
    try {
        const questionDetails = await QuestionDB.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "answers",
                    localField: "_id",
                    foreignField: "question",
                    as: "answerDetails"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "question",
                    as: "comments"
                }
            },
            {
                $project: {
                    __v: 0
                }
            }
        ]);
        res.status(200).json(questionDetails);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Question not found"
        });
    }
});

module.exports = router;