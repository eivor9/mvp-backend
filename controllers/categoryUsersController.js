const express = require('express');
const userCategories = express.Router({ mergeParams: true });

//query imports
const { getCategory } = require('../queries/categories');

const {
    createUserCategory,
    getUserCategories,
    deleteUserCategory
  }= require('../queries/categoryUsers')

  //Get route
  userCategories.get('/', async(req, res) => {
    const { category_id } = req.params;

    try {

        const categoryUsers = await getUserCategories(category_id);
        const category = await getCategory(category_id);
    
        if (category) {
            res.status(200).json({ ...category, categoryUsers});
        } else {
            res.status(404).json({ error: "Category not found"});
        }

    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
})

// post route 
userCategories.post('/', async(req, res) => {
    try {
        const newCategoryUser = await createUserCategory(req.body);
        res.status(201).json(newCategoryUser);
      } catch (error) {
        res.status(404).json({ error: 'user category not created' });
      }
})

// delete route
userCategories.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const deletedUserCategory = await deleteUserCategory(id);
  if (deletedUserCategory.id) {
    res
      .status(200)
      .json({ message: 'categoryUser successfully deleted', ...deletedUserCategory });
  } else {
    res.status(404).json('categoryUser not found');
  }
})
module.exports = userCategories