// controllers/subcategoriesController.js

// DEPENDENCIES
const express = require('express');
const subcategories = express.Router({ mergeParams: true });

// INDEX
subcategories.get('/', async (req, res) => {});

// SHOW
subcategories.get('/:id', async (req, res) => {});

module.exports = subcategories;
