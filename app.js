// app.js

// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// USERS
const usersController = require("./controllers/usersController.js");
app.use("/users", usersController);

// CATEGORIES
const categoriesController = require("./controllers/categoriesController.js");
app.use("/categories", categoriesController);

// CONNECTIONS
const connectionsController = require("./controllers/connectionsController.js");
app.use("/connections", connectionsController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
