// import express
const express = require("express");
const methodOverride = require("method-override");
// const productController = require('./controllers/products_controller')
const controllers = require("./controllers");
// create instance
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");

//const navLinks = require("./navLinks");

//const navLinks = require('./navLinks');

// db connection
require("./config/db.connection");

// configure the app settings (used by app.listen)
const PORT = 3000;

// app configs - app.set()
app.set("view engine", "ejs");

app.use(express.static("public"));

// method override middleware
// convert a get/post request to a delete (or put) request
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
//app.use(navLinks);
//add seesion app config here

app.use("/home", controllers.home);
app.use("/auth", controllers.auth);

app.get("/", (request, response) => response.send("Welcome to Twitter!"));

/* 
    EXPRESS Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
*/

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

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
