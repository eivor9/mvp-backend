// Validate message body
const checkBody = (req, res, next) => {
    const { body } = req.body;
    if (!body || typeof body !== 'string') {
      return res.status(400).json({ error: 'Message body is required' });
    }
    next();
  };
  
  // Validate sender_id
  const checkSenderId = (req, res, next) => {
    const { sender_id } = req.body;
    if (!sender_id || typeof sender_id !== 'number') {
      return res.status(400).json({ error: 'sender_id is required and must be a number' });
    }
    next();
  };
  
  // Validate recipient_id
  const checkRecipientId = (req, res, next) => {
    const { recipient_id } = req.body;
    if (!recipient_id || typeof recipient_id !== 'number') {
      return res.status(400).json({ error: 'recipient_id is required and must be a number' });
    }
    next();
  };
  
  // Validate conversation_id
  const checkConnectionId = (req, res, next) => {
    const { connection_id } = req.body;
    if (!connection_id || typeof connection_id !== 'number') {
      return res.status(400).json({ error: 'connection_id is required and must be a number' });
    }
    next();
  };
  
  module.exports = {
    checkBody,
    checkSenderId,
    checkRecipientId,
    checkConnectionId,
  };