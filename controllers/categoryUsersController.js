const express = require('express');
const categoryUsers = express.Router({ mergeParams: true });

//query imports
const { getCategory } = require('../queries/categories');

const {
    createCategoryUser,
    getCategoryUsers,
    deleteCategoryUser
  } = require('../queries/categoryUsers')

  //Get route
categoryUsers.get('/', async(req, res) => {
    const { category_id } = req.params;

    try {

        const categoryUsers = await getCategoryUsers(category_id);
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
categoryUsers.post('/', async(req, res) => {
    try {
        const newCategoryUser = await createCategoryUser(req.body);
        res.status(201).json(newCategoryUser);
      } catch (error) {
        res.status(404).json({ error: 'user not created' });
      }
})

// delete route
categoryUsers.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const deletedCategoryUser = await deleteCategoryUser(id);
  if (deletedCategoryUser.id) {
    res
      .status(200)
      .json({ message: 'categoryUser successfully deleted', ...deletedCategoryUser });
  } else {
    res.status(404).json('categoryUser not found');
  }
})
module.exports = categoryUsers