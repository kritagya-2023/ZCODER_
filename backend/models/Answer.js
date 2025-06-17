const { Schema, model, Types } = require('mongoose');

const AnswerSchema = new Schema({
    question: {
        type: Types.ObjectId,
        ref: 'Questions'
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    userInfo: {
        type: Object
    },
    comment: {
        type: Types.ObjectId,
        ref: 'Comments'
    }
});

module.exports = model('Answers', AnswerSchema);