const express = require('express');
const router = express.Router();

const questionRoutes = require('./Question');
const answerRoutes = require('./Answer');
const commentRoutes = require('./Comment');
const calendarRoutes = require('./Calendar');
const userRoutes = require('./UserRoutes');
const codeRoutes = require('./CodeEditor');

// Root endpoint
router.get('/', (req, res) => {
    res.send("Welcome to the ZCoder Backend API");
});

// Mount all routers
router.use('/question', questionRoutes);
router.use('/answer', answerRoutes);
router.use('/comment', commentRoutes);
router.use('/contests', calendarRoutes);
router.use('/users', userRoutes);
router.use('/code', codeRoutes);

module.exports = router;