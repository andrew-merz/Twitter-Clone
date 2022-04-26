const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const { User } = require("../models");

router.get("/register", function (req, res) {
    //return res.render("auth/register");
    res.send('register page')
});

router.get("/login", function (req, res) {
    res.send('login page')
});

//add router.post and router.get later

module.exports = router;

app.get("/", (request, response) => 
response.send("Welcome to Twitter!"));