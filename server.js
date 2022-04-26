// import express
const express = require("express");
const methodOverride = require("method-override");
// const productController = require('./controllers/products_controller')
const controllers = require("./controllers");
// create instance
const app = express();

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
app.get("/", (request, response) => response.send("Welcome to Twitter!"));

/* 
    EXPRESS Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
*/

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
