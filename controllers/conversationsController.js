// controllers/conversationsController.js

// DEPENDENCIES
const express = require('express');
const conversations = express.Router({ mergeParams: true });
const {
  getAllConversations,
  getOneConversation,
  createConversation,
  deleteConversation,
} = require('../queries/conversations.js');

// MESSAGES
const messagesController = require('./messagesController.js');
conversations.use('/:conversation_id/messages', messagesController);

// INDEX - Get all conversations for a connection
conversations.get('/', async (req, res) => {
  const { connection_id } = req.params;
  const conversationsList = await getAllConversations(connection_id);
  if (conversationsList.length) {
    res.status(200).json(conversationsList);
  } else {
    res
      .status(404)
      .json({ error: 'Conversations not found' });
  }
});

// SHOW - Get one specific conversation
conversations.get('/:id', async (req, res) => {
  const { id } = req.params;
  const conversation = await getOneConversation(id);
  if (conversation.id) {
    res.status(200).json(conversation);
  } else {
    res
      .status(404)
      .json({ error: 'Conversation not found' });
  }
});

// CREATE - Create a new conversation
conversations.post('/', async (req, res) => {
  try {
    const newConversation = await createConversation(req.body);
    res.status(200).json(newConversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Delete a conversation
conversations.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedConversation = await deleteConversation(id);
  if (deletedConversation.id) {
    res
      .status(200)
      .json({
        message: 'Conversation successfully deleted',
        ...deletedConversation,
      });
  } else {
    res.status(404).json({ error: 'Conversation not found' });
  }
});

module.exports = conversations;
