const express = require("express");
const methodOverride = require("method-override");
const controllers = require("./controllers");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const navLinks = require("./navLinks");
const PORT = process.env.PORT;

require("./config/db.connection");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => response.send("Welcome to Twitter!"));

/* SECTION App Config */
app.use(
  session({
    // where to store the sessions in mongodb
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    // secret key is used to sign every cookie to say its is valid
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    // configure the experation of the cookie
    cookie: {
      maxAge: 1000 * 60 * 120, // two hours
    },
  })
);

let sessionLog = (req, res, next) => {
  console.log(req.session);
  next();
};

app.use(sessionLog);

app.use("/home", controllers.home);
app.use("/auth", controllers.auth);
app.use(navLinks);

app.use(function (req, res, next) {
  res.locals.user = req.session.currentUser;
  next();
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
