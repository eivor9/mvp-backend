// Validate name
const checkName = (req, res, next) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'name is required and must be a string' });
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
  
  module.exports = {
    checkName,
    checkConnectionId,
  };