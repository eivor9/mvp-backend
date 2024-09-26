// queries/messages.js
const db = require('../db/dbConfig.js');

// Get all messages for a specific conversation
const getAllMessages = async (conversation_id) => {
  try {
    const messages = await db.any(
      'SELECT * FROM messages WHERE conversation_id=$1',
      conversation_id
    );
    return messages;
  } catch (error) {
    return error;
  }
};

// Get one specific message
const getMessage = async (id) => {
  try {
    const message = await db.one(
      'SELECT * FROM messages WHERE id=$1',
      id
    );
    return message;
  } catch (error) {
    return error;
  }
};

// Create a new message
const createMessage = async (message) => {
  try {
    const newMessage = await db.one(
      'INSERT INTO messages (body, time_sent, sender_id, recipient_id, conversation_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [
        message.body,
        message.time_sent,
        message.sender_id,
        message.recipient_id,
        message.conversation_id,
      ]
    );
    return newMessage;
  } catch (error) {
    return error;
  }
};

// Delete a message
const deleteMessage = async (id) => {
  try {
    const deletedMessage = await db.one(
      'DELETE FROM messages WHERE id=$1 RETURNING *',
      id
    );
    return deletedMessage;
  } catch (error) {
    return error;
  }
};

// Update a message
const updateMessage = async (id, updatedMessage) => {
  try {
    const message = await db.one(
      'UPDATE messages SET body=$1, time_sent=$2 WHERE id=$3 RETURNING *',
      [updatedMessage.body, updatedMessage.time_sent, id]
    );
    return message;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
};