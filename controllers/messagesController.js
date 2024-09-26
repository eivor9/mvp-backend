// controllers/messagesController.js

// DEPENDENCIES
const express = require('express');
const messages = express.Router({ mergeParams: true });
const {
  getAllMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
} = require('../queries/messages.js');

// INDEX - Get all messages for a conversation
messages.get('/', async (req, res) => {
  const { conversation_id } = req.params;
  const messagesList = await getAllMessages(conversation_id);
  if (messagesList.length) {
    res.status(200).json(messagesList);
  } else {
    res
      .status(500)
      .json({ error: 'No messages found or server error' });
  }
});

// SHOW - Get one specific message
messages.get('/:id', async (req, res) => {
  const { id } = req.params;
  const message = await getMessage(id);
  if (message.id) {
    res.status(200).json(message);
  } else {
    res
      .status(500)
      .json({ error: 'Message not found or server error' });
  }
});

// CREATE - Create a new message
messages.post('/', async (req, res) => {
  try {
    const newMessage = await createMessage(req.body);
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Delete a message
messages.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedMessage = await deleteMessage(id);
  if (deletedMessage.id) {
    res
      .status(200)
      .json({
        message: 'Message successfully deleted',
        ...deletedMessage,
      });
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

// UPDATE - Update a message
messages.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMessage = await updateMessage(id, req.body);
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = messages;
