const mongoose = require('mongoose');

userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tweets: [],
})

const User = mongoose.model('User', userSchema)

module.exports = User;