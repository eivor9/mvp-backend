const express = require('express');
const userSubcategories = express.Router({ mergeParams: true });

//query imports
const { getOneSubcategory } = require('../queries/subcategories');

const {
    createUserSubcategory,
    getUserSubcategories,
    deleteUserSubcategory
  }= require('../queries/subcategoryUsers')

  //Get route
  userSubcategories.get('/', async(req, res) => {
    const { subcategory_id } = req.params;

    try {

        const subcategoryUsers = await getUserSubcategories(subcategory_id);
        const subcategory = await getOneSubcategory(subcategory_id);
    
        if (subcategory) {
            res.status(200).json({ ...subcategory, subcategoryUsers});
        } else {
            res.status(404).json({ error: "Category not found"});
        }

    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
})

// post route 
userSubcategories.post('/', async(req, res) => {
    try {
        const newUserSubcategory = await createUserSubcategory(req.body);
        res.status(201).json(newUserSubcategory);
      } catch (error) {
        res.status(404).json({ error: 'user subcategory not created' });
      }
})

// delete route
userSubcategories.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const deletedUserSubcategory = await deleteUserSubcategory(id);
  if (deletedUserSubcategory.id) {
    res
      .status(200)
      .json({ message: 'subcategoryUser successfully deleted', ...deletedUserSubcategory });
  } else {
    res.status(404).json('subcategoryUser not found');
  }
})
module.exports = userSubcategories;