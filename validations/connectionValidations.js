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
  
  // Validate category_id
  const checkSkillId = (req, res, next) => {
    const { skill_id } = req.body;
    if (!skill_id || typeof skill_id !== 'number') {
      return res.status(400).json({ error: 'skill_id is required and must be a number' });
    }
    next();
  };
  
  module.exports = {
    checkMentorId,
    checkMenteeId,
    checkSkillId,
  };