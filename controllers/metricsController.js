// controllers/metricsController.js

// DEPENDENCIES
const express = require('express');
const metrics = express.Router({ mergeParams: true });
const {
  getAllMetrics,
  getMetric,
  createMetric,
  deleteMetric,
  updateMetric,
} = require('../queries/metrics');

//validations
const {
  checkName,
  checkConnectionId,
} = require("../validations/metricValidations")

// INDEX
metrics.get('/all', async (req, res) => {
  const { connection_id } = req.params;
  const allMetrics = await getAllMetrics(connection_id);
  if (allMetrics[0]) {
    res.status(200).json(allMetrics);
  } else {
    res.status(500).json({ error: 'server error' });
  }
});

// SHOW
metrics.get('/:id', async (req, res) => {
  const { id } = req.params;
  const metric = await getMetric(id);
  if (metric) {
    res.json(metric);
  } else {
    res.status(400).json({ error: 'not found' });
  }
});

// CREATE
metrics.post('/', checkName, checkConnectionId, async (req, res) => {
  const newMetric = await createMetric(req.body);
  res.json(newMetric);
});

// DELETE
metrics.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedMetric = await deleteMetric(id);
  if (deletedMetric.id) {
    res.json(deletedMetric);
  } else {
    res.status(400).json({ error: 'not found' });
  }
});

// UPDATE
metrics.put('/:id', checkName, checkConnectionId, async (req, res) => {
  const { id } = req.params;
  const updatingMetric = await updateMetric(id, req.body);
  if (updatingMetric.id) {
    res.status(200).json(updatingMetric);
  } else {
    res.status(404).json({ error: 'not found. oof' });
  }
});

module.exports = metrics;
