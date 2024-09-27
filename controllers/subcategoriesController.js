// controllers/subcategoriesController.js

// DEPENDENCIES
const express = require('express');
const subcategories = express.Router({ mergeParams: true });

const { getCategory } = require('../queries/categories');
const {
    getAllSubcategories,
    getOneSubcategory
} = require('../queries/subcategories')

// INDEX - get all subcategories for a specific category by id
subcategories.get("/", async (req, res) => {

    const { category_id } = req.params;

    try {

        const subcategories = await getAllSubcategories(category_id);
        const category = await getCategory(category_id);
    
        if (category) {
            res.status(200).json({ ...category, subcategories});
        } else {
            res.status(404).json({ error: "Category not found"});
        }

    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
});

// SHOW - get one subcategory by id
subcategories.get("/:id", async (req, res) => {

    const { category_id, id } = req.params;

    try {
        
        const subcategory = await getOneSubcategory(id);
        const category = await getCategory(category_id);

        if (subcategory) {
            res.json({ ...category, subcategory });
        } else {
            res.status(404).json({ error: "Subcategory not found"});
        }

    } catch(error) {
        res.status(500).json({ error: "server error" });
    }
});

module.exports = subcategories;
