const { Schema, model, Types } = require('mongoose');

const QuestionSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    tags: {
        type: Array,
        default: []
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

module.exports = model('Questions', QuestionSchema);