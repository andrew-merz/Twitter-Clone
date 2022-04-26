const mongoose = require('mongoose');

tweetSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    likes: {
        type: Number,
    },
    retweets: {
        type: Number,
    },
},
    {
        timestamps: true,
    }
)