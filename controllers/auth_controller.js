const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const db = require("../models");

router.get("/register", function (req, res) {
  return res.render("auth/register");
});

router.get("/login", function (req, res) {
  res.render("auth/login");
});

router.get("/logout", async function (req, res) {
  try {
    await req.session.destroy();
    return res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

router.get("/:id/editprofile", async (req, res, next) => {
  try {
    const updatedUser = await db.User.findById(req.params.id);
    const context = { currentUser: updatedUser, id: req.params.id };
    return res.render("editProfile.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.post("/register", async function (req, res) {
  try {
    const foundUser = await User.exists({ email: req.body.email });
    if (foundUser) {
      return res.redirect("/auth/login");
    }
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const newUser = await User.create(req.body);
    return res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

router.post("/login", async function (req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.redirect("/auth/register");
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (!match) return res.send("password invalid");
    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username,
      profilePic: foundUser.profilePic,
    };
    return res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await db.User.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.redirect(`/home`);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await db.User.findByIdAndDelete(req.params.id);
    console.log(deletedUser);
    return res.redirect("./logout");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;