// queries/userLinks.js

const db = require('../db/dbConfig.js');

// Get all links for a user
const getUserLinks = async (userId) => {
  try {
    const links = await db.any('SELECT * FROM user_links WHERE user_id=$1', userId);
    return links;
  } catch (error) {
    return error;
  }
};

// Create a new user link
const createUserLink = async (userId, link) => {
  try {
    const newLink = await db.one(
      'INSERT INTO user_links (user_id, link) VALUES ($1, $2) RETURNING *',
      [userId, link]
    );
    return newLink;
  } catch (error) {
    return error;
  }
};

// Delete a user link
const deleteUserLink = async (linkId) => {
  try {
    const deletedLink = await db.one(
      'DELETE FROM user_links WHERE id = $1 RETURNING *',
      linkId
    );
    return deletedLink;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getUserLinks,
  createUserLink,
  deleteUserLink,
};
