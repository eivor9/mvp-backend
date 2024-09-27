// controllers/categoriesController.js

// DEPENDENCIES
const express = require('express');
const categories = express.Router();

// SUBCATEGORIES
const subcategoriesController = require("./subcategoriesController.js");
categories.use("/:category_id/subcategory", subcategoriesController);

//QUERIES
const {
    getAllCategories, 
    getCategory
} = require('../queries/categories.js');

// INDEX - get all categories
categories.get("/", async (req, res) => {

    try {

        const allCategories = await getAllCategories();
        if(allCategories.length > 0) {
            res.status(200).json(allCategories);
        } else {
            res.status(500).json({ error: "server error"});
        }

    } catch (error) {
        res.status(500).json({ error: "server error"})
    }
});

// SHOW - get a single category by id
categories.get("/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const category = await getCategory(id);
        if(category) {
            res.json(category);
        } else {
            res.status(404).json({ error: "Category not found"});
        }

    } catch(error) {
        res.status(500).json({ error: "server error"})
    }
});

module.exports = categories;
