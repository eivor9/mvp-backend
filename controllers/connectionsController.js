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

// SKILLS AND ASSOCIATED METRICS 

const skillsMetrics = {
  1: ["Introduction to JavaScript and Its Foundations", "Control Flow and Functions", "Objects, Arrays, and DOM Manipulation"],
  2: ["Introduction to HTML Basics", "Building Structure and Forms", "Advanced HTML Features and Best Practices"],
  3: ["Fundamentals and Styling Basics", "Layout Techniques and Positioning", "Responsive Design and Advanced Features"],
  4: ["Introduction to SQL and Basic Queries", "Working with Data: Inserting, Updating and Deleting", "Advanced Queries and Database Management"],
  5: ["Intro to Web Dev and Frontend Basics", "Backend Dev and Server-Side Programming", "Full-Stack Dev and Deployment"],
  6: ["Key Concepts and Skills", "Problem-Solving Techniques", "Advanced Topics and System Design"],
  7: ["The STAR Method", "Common Questions and Effective Responses", "Building Confidence and Communication Skills"]
}

// IMPORT QUERY TO CREATE METRIC
const { createMetric } = require('../queries/metrics.js');

//Validations
const {
  checkMentorId,
  checkMenteeId,
  checkSkillId,
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
const messagesController = require('./messagesController.js');
connections.use(
  '/:connection_id/messages',
  messagesController
);

// INDEX
connections.get('/', authenticateToken, async (req, res) => {
  const { user_id } = req.params
  const connections = await getConnections(user_id);
  try {
    if (connections.length > 0) {
       res.status(200).json(connections);
    } else {
      res.status(200).json([])
    }
  } catch {
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
connections.post('/', authenticateToken, checkMentorId, checkMenteeId, checkSkillId, async (req, res) => {


  try {
    const newConnection = await createConnection(req.body);
    const metricsArr = []
    if(newConnection.id) {
      const { skill_id, id } = newConnection;
      const metricOne = skillsMetrics[Number(skill_id)][0]
      const metricTwo = skillsMetrics[Number(skill_id)][1]
      const metricThree = skillsMetrics[Number(skill_id)][2]

      const createMetricOne = await createMetric({"name": metricOne, "connection_id": id, "progress": 0, "skill_id": skill_id})
      const createMetricTwo = await createMetric({"name": metricTwo, "connection_id": id, "progress": 0, "skill_id": skill_id})
      const createMetricThree = await createMetric({"name": metricThree, "connection_id": id, "progress": 0, "skill_id": skill_id})
      metricsArr.push(createMetricOne, createMetricTwo, createMetricThree)
      }

    res.status(200).json(newConnection);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//[name, progress, skill_id, connection_id]

// UPDATE
connections.put('/:id', authenticateToken, checkMentorId, checkMenteeId, checkSkillId, async (req, res) => {
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
