// queries/subcategories.js

const db = require('../db/dbConfig.js');

const getAllSubcategories = async (categoryId) => {
  try {
    const allSubcategories = await db.any("SELECT * FROM subcategories WHERE category_id=$1", [categoryId]);
    return allSubcategories;
  } catch (error) {
    return error;
  }
};

const getOneSubcategory = async (id) => {
  try {
      const subcategory = await db.one("SELECT * FROM subcategories WHERE id=$1", [id]);
      return subcategory;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllSubcategories, getOneSubcategory };