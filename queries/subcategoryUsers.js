const db = require('../db/dbConfig');

const getUserSubcategories = async(subcategory_id) => {
    try {
        const users = await db.any("SELECT users.*, userSubcategories.is_mentor, userSubcategories.is_mentee, userSubcategories.subcategory_id FROM users JOIN userSubcategories ON users.id = userSubcategories.user_id WHERE userSubcategories.subcategory_id = $1", [subcategory_id])
        return users
    } catch (error) {
        console.error('Error fetching user subcategories:', error)
        return error
    }
}

const createUserSubcategory = async(userSubcategory) => {
    try {
        const newUserSubcategory = await db.one("INSERT INTO userSubcategories (subcategory_id, user_id, is_mentor, is_mentee) VALUES ($1, $2, $3, $4) RETURNING *",
        [
            userSubcategory.subcategory_id,
            userSubcategory.user_id,
            userSubcategory.is_mentor,
            userSubcategory.is_mentee
        ]
        );
        return newUserSubcategory;
    } catch (error) {
        console.error('Error creating user subcategory:', error);
        return error;
    }
}

const deleteUserSubcategory = async (id) => {
    try {
        const deletedUserSubcategory = await db.one("DELETE FROM userSubcategories WHERE id=$1 RETURNING *", [id]);
        return deletedUserSubcategory;
    } catch (error) {
        console.error('Error deleting user subcategory:', error);
        return error;
    }
  };

  module.exports = {
    createUserSubcategory,
    getUserSubcategories,
    deleteUserSubcategory
  }