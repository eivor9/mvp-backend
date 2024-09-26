// queries/conversations.js
const db = require('../db/dbConfig.js');

// Get all conversations for a specific connection
const getConversations = async (connection_id) => {
  try {
    const conversations = await db.any(
      'SELECT * FROM conversations WHERE connection_id=$1',
      connection_id
    );
    return conversations;
  } catch (error) {
    return error;
  }
};

// Get one specific conversation
const getOneConversation = async (id) => {
  try {
    const conversation = await db.one(
      'SELECT * FROM conversations WHERE id=$1',
      id
    );
    return conversation;
  } catch (error) {
    return error;
  }
};

// Create a new conversation
const createConversation = async (conversation) => {
  try {
    const newConversation = await db.one(
      'INSERT INTO conversations (connection_id, mentor_id, mentee_id) VALUES($1, $2, $3) RETURNING *',
      [
        conversation.connection_id,
        conversation.mentor_id,
        conversation.mentee_id,
      ]
    );
    return newConversation;
  } catch (error) {
    return error;
  }
};

// Delete a conversation
const deleteConversation = async (id) => {
  try {
    const deletedConversation = await db.one(
      'DELETE FROM conversations WHERE id=$1 RETURNING *',
      id
    );
    return deletedConversation;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getConversations,
  getOneConversation,
  createConversation,
  deleteConversation,
};
