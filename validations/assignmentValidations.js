//validate assignment name
const checkName = (req, res, next) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
    }
    next();
  };
  
  // Validate connection_id
  const checkConnectionId = (req, res, next) => {
    const { connection_id } = req.body;
    if (!connection_id || typeof connection_id !== 'number') {
      return res.status(400).json({ error: 'connection_id is required and must be a number' });
    }
    next();
  };
  
  // Validate metric_id
  const checkMetricId = (req, res, next) => {
    const { metric_id } = req.body;
    if (!metric_id || typeof metric_id !== 'number') {
      return res.status(400).json({ error: 'metric_id is required and must be a number' });
    }
    next();
  };
  
  module.exports = {
    checkName,
    checkConnectionId,
    checkMetricId,
  };