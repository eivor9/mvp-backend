// controllers/connectionsController.js

// DEPENDENCIES
const express = require('express');
const connections = express.Router({ mergeParams: true });
const {
  getConnections,
  getOneConnection,
  createConnection,
  deleteConnection,
  updateConnection
} = require('../queries/connections.js');

//Validations
const {
  checkMentorId,
  checkMenteeId,
  checkCategoryId,
  checkSubcategoryId,
} = require('../validations/connectionValidations.js')

// AUTHENTICATION
const {
  authenticateToken
} = require('../auth/auth.js')

// ASSIGNMENTS
const assignmentsController = require('./assignmentsController.js');
connections.use('/:connection_id/assignments', assignmentsController);

// METRICS
const metricsController = require('./metricsController.js');
connections.use('/:connection_id/metrics', metricsController);

// CONVERSATIONS
const conversationsController = require('./conversationsController.js');
connections.use(
  '/:connection_id/conversations',
  conversationsController
);

// INDEX
connections.get('/', authenticateToken, async (req, res) => {
  const { user_id } = req.params
  const connections = await getConnections(user_id);
  if (connections.length) {
    res.status(200).json(connections);
  } else {
    res.status(500).json({ error: 'server error' });
  }
});

// SHOW
connections.get('/:id', authenticateToken, async (req, res) => {
  const { id, user_id } = req.params;
  const connection = await getOneConnection(id, user_id);
  if (connection.id) {
    res.status(200).json(connection);
  } else {
    res.status(500).json({ error: 'server error' });
  }
});

// CREATE
connections.post('/', authenticateToken, checkMentorId, checkMenteeId, checkCategoryId, checkSubcategoryId, async (req, res) => {
  try {
    const newConnection = await createConnection(req.body);
    res.status(200).json(newConnection);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// UPDATE
connections.put('/:id', authenticateToken, checkMentorId, checkMenteeId, checkCategoryId, checkSubcategoryId, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedConnection = await updateConnection(id, req.body);
    res.status(200).json(updatedConnection);
  } catch (error) {
    res.status(404).json({ error: error });
  }
})

// DELETE
connections.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const deletedConnection = await deleteConnection(id);
  if (deletedConnection.id) {
    res
      .status(200)
      .json({
        message: 'Connection successfully deleted',
        ...deletedConnection,
      });
  } else {
    res.status(404).json('Connection not found');
  }
});

module.exports = connections;
