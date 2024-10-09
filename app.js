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

// CategoryUsers
const categoryUsersController = require("./controllers/categoryUsersController.js");
app.use("/category-users", categoryUsersController);

// subcategory users
const userSubcategoriesController = require("./controllers/userSubcategoriesController.js")
app.use("/subcategory-users", userSubcategoriesController);

// Other imports...
//testimonials
const testimonialsController = require("./controllers/testimonialsController.js");
app.use("/testimonials", testimonialsController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});


// EXPORT
module.exports = app;
