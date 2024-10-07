// Validate connection_id
const checkConnectionId = (req, res, next) => {
    const { connection_id } = req.body;
    if (!connection_id || typeof connection_id !== 'number') {
      return res.status(400).json({ error: 'connection_id is required and must be a number' });
    }
    next();
  };
  
  // Validate mentor_id
  const checkMentorId = (req, res, next) => {
    const { mentor_id } = req.body;
    if (!mentor_id || typeof mentor_id !== 'number') {
      return res.status(400).json({ error: 'mentor_id is required and must be a number' });
    }
    next();
  };
  
  // Validate mentee_id
  const checkMenteeId = (req, res, next) => {
    const { mentee_id } = req.body;
    if (!mentee_id || typeof mentee_id !== 'number') {
      return res.status(400).json({ error: 'mentee_id is required and must be a number' });
    }
    next();
  };
  
  module.exports = {
    checkConnectionId,
    checkMentorId,
    checkMenteeId,
  };