const db = require('../db/dbConfig');

const getUserCategories = async(category_id) => {
    try {
        const users = await db.any("SELECT users.*, userCategories.is_mentor, userCategories.is_mentee, userCategories.category_id FROM users JOIN userCategories ON users.id = userCategories.user_id WHERE userCategories.category_id = $1", [category_id])
        return users
    } catch (error) {
        return error
    }
}

const createUserCategory = async(userCategory) => {
    try {
        const newUserCategory = await db.one("INSERT INTO userCategories (category_id, user_id, is_mentor, is_mentee) VALUES ($1, $2, $3, $4) RETURNING *",
        [
            userCategory.category_id,
            userCategory.user_id,
            userCategory.is_mentor,
            userCategory.is_mentee
        ]
        );
        return newUserCategory;
    } catch (error) {
       return error;
    }
}

const deleteUserCategory = async (id) => {
    try {
        const deletedUserCategory = await db.one("DELETE FROM userCategories WHERE id=$1 RETURNING *", [id]);
        return deletedUserCategory;
    } catch (error) {
      return error;
    }
  };

  module.exports = {
    createUserCategory,
    getUserCategories,
    deleteUserCategory
  }