const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const { User } = require("../models");

router.get("/register", function (req, res) {
    return res.render("auth/register");
});

router.get("/login", function (req, res) {
    res.render("auth/login");
});

//add router.post and router.get later

module.exports = router;