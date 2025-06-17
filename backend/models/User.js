const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    bio: {
        type: String
    }
});

module.exports = model('Users', UserSchema);