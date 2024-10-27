// queries/messages.js
const db = require('../db/dbConfig.js');

// Get all messages for a specific connection
const getAllMessages = async (connection_id) => {
  try {
    const messages = await db.any(
      'SELECT * FROM messages WHERE connection_id=$1 ORDER BY time_sent',
      connection_id
    );
    return messages;
  } catch (error) {
    return error;
  }
};

// Get one specific message
const getOneMessage = async (id) => {
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
      'INSERT INTO messages (body, sender_id, recipient_id, connection_id) VALUES($1, $2, $3, $4) RETURNING *',
      [
        message.body,
        message.sender_id,
        message.recipient_id,
        message.connection_id,
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
      'UPDATE messages SET body=$1 WHERE id=$2 RETURNING *',
      [updatedMessage.body, id]
    );
    return message;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllMessages,
  getOneMessage,
  createMessage,
  deleteMessage,
  updateMessage,
};