// queries/metrics.js

const db = require('../db/dbConfig.js');

//Contact Jazon if error found.

const getAllMetrics = async (connection_id) => {
  try {
    const allMetrics = await db.any('SELECT * FROM metrics WHERE connection_id=$1', [connection_id]);
    // console.log(allMetrics);
    return allMetrics;
  } catch (error) {
    return error;
  }
};

const getMetric = async (id) => {
  try {
    const metrics = await db.one(
      'SELECT * FROM metrics WHERE id=$1',
      id
    );
    console.log(metrics);
    return metrics;
  } catch (error) {
    return error;
  }
};

const createMetric = async (metric) => {
  const { name, progress } = metric;
  try {
    const newMetric = await db.one(
      'INSERT INTO metrics (name, progress) VALUES($1, $2) RETURNING *',
      [name, progress]
    );
    // console.log(newMetric)
    return newMetric;
  } catch (error) {
    return error;
  }
};

const deleteMetric = async (id) => {
  try {
    const deletedMetric = await db.one(
      'DELETE FROM metrics WHERE id=$1 RETURNING *',
      id
    );
    // console.log(deleteMetric)
    return deletedMetric;
  } catch (error) {
    return error;
  }
};

const updateMetric = async (id, metric) => {
  const { name, progress } = metric;
  try {
    const updatedMetric = await db.one(
      'UPDATE metrics SET name=$1, progress=$2 WHERE id=$3 RETURNING *',
      [name, progress, id]
    );
    // console.log(updatedMetric)
    return updatedMetric;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllMetrics,
  getMetric,
  createMetric,
  deleteMetric,
  updateMetric,
};
