const { Schema, model, Types } = require('mongoose');

const CommentSchema = new Schema({
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
    }
});

module.exports = model('Comments', CommentSchema);