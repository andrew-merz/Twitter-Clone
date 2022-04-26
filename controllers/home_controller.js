const express = require('express')

const router = express.Router()

const db = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const tweets = await db.Tweet.find({});
        const context = { tweets }
        console.log(tweets);
        return res.render('home.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }

});

module.exports = router