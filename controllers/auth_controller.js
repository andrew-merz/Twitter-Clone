const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

router.get("/register", function (req, res) {
  return res.render("auth/register");
  //res.send("register page");
});

router.get("/login", function (req, res) {
  return res.render("auth/login");
});

router.post("/register", async function (req, res) {
  try {
    // step check if user exists
    const foundUser = await User.exists({ email: req.body.email });
    // if so redirect to login
    if (foundUser) {
      return res.redirect("/auth/login");
    }
    // if not create user and redirect to login

    // salt will created a more complicated hash
    const salt = await bcrypt.genSalt(12);
    // hash will convert our password into something more secure
    // test1234 => "$2a$10$5vR9VhGpkARz6EFPdkuNQ.aZNRGUgSCNSKEb9Xp1IKzrfxYETlkB2"
    const hash = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash;

    // create user in database
    const newUser = await User.create(req.body);

    return res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

//Login POST route
router.post("/login", async function (req, res) {
  try {
    // check if the user exists
    const foundUser = await User.findOne({ email: req.body.email });
    console.log(foundUser);
    // if not
    // redirect to register
    if (!foundUser) return res.redirect("/auth/register");

    // if the user exists
    // validate the user if passwords match -> login
    // .compare(body password, hashed password) => return true or false
    const match = await bcrypt.compare(req.body.password, foundUser.password);

    // if not match send error
    if (!match) return res.send("password invalid");

    // if match create the session and redirect to home\
    // here we have created the key card
    //console.log(req.session);
    // req.session.User = {
    //   id: foundUser._id,
    //   username: foundUser.username,
    // };

    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
