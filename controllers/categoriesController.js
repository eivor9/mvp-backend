// controllers/categoriesController.js

// DEPENDENCIES
const express = require('express');
const categories = express.Router();

// SUBCATEGORIES
const subcategoriesController = require('./subcategoriesController.js');
categories.use('/:category_id/subcategory', subcategoriesController);

// INDEX
categories.get('/', async (req, res) => {});

// SHOW
categories.get('/:id', async (req, res) => {});

module.exports = categories;
