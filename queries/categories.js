// queries/categories.js

const db = require('../db/dbConfig.js');

const getAllCategories = async () => {
  try {
    const categories = await db.any("SELECT * FROM categories");
    return categories;
  } catch (error) {
    return error;
  }
};

const getCategory = async (id) => {
  try {
    const category = await db.one("SELECT * FROM categories WHERE id=$1", [id]);
    return category;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllCategories, getCategory };
