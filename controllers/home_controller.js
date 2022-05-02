const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const tweets = await db.Tweet.find({}).populate("user");
    const currentUser = req.session.currentUser;
    const context = { tweets, currentUser };
    console.log(tweets.likes)
    return res.render("home.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//switch this route to ./:id/bookmarks later
//make bookmark.ejs that shows bookmared tweet only
//no tweet button in bookmark.ejs
router.get("/bookmarks", async (req, res, next) => {
  try {
    const tweets = await db.Tweet.find({});
    const currentUser = req.session.currentUser;
    console.log(tweets);
    const context = { tweets, currentUser };
    return res.render("bookmarks.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.get("/", async (req, res, next) => {
  try {
    const tweets = await db.Tweet.find({});
    const currentUser = req.session.currentUser;
    const context = { tweets, currentUser };
    return res.render("home.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//const foundUser = await User.findOne({ email: req.body.email });

// router.get('/editprofile', async (req, res, next) => {
//     try {
//         const currentUser = await req.session.currentUser
//         const context = {currentUser}
//         return res.render('editProfile.ejs', context)

//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     }
// })

// router.get("/:id/editprofile", async (req, res, next) => {
//   try {
//     const updatedUser = await db.User.findById(req.params.id);
//     console.log(updatedUser);
//     const context = { currentUser: updatedUser, id: req.params.id };
//     return res.render("editProfile.ejs", context);
//   } catch (error) {
//     console.log(error);
//     req.error = error;
//     return next();
//   }
// });

router.get("/:id", async (req, res, next) => {
  try {
    const tweet = await db.Tweet.findById(req.params.id);
    const currentUser = req.session.currentUser;
    const context = { oneTweet: tweet, currentUser };
    return res.render("show.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const updatedTweet = await db.Tweet.findById(req.params.id);
    console.log(updatedTweet);
    const context = {
      tweet: updatedTweet,
    };
    return res.render("edit.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    // console.log(`The req.body is ${req.body}`)
    const createdTweet = await db.Tweet.create(req.body);
    console.log(`The created tweet is ${createdTweet}`);
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedTweet = await db.Tweet.findByIdAndDelete(req.params.id);
    console.log(deletedTweet);
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// router.put("/:id", async (req, res, next) => {
//   try {
//     const updatedUser = await db.User.findByIdAndUpdate(
//       req.params.id,
//       req.body
//     );
//     console.log(updatedUser);
//     //const updatedUsername = await db.Product.findByIdAndUpdate(req.params.id, req.body);

//     return res.redirect(`/home`);
//   } catch (error) {
//     console.log(error);
//     req.error = error;
//     return next();
//   }
// });

module.exports = router;
