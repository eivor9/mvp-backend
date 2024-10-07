// Validate subcategory_id
const checkSubcategoryId = (req, res, next) => {
    const { subcategory_id } = req.body;
    if (!subcategory_id || typeof subcategory_id !== 'number') {
      return res.status(400).json({ error: 'subcategory_id is required and must be a number' });
    }
    next();
  };
  
  // Validate user_id
  const checkUserId = (req, res, next) => {
    const { user_id } = req.body;
    if (!user_id || typeof user_id !== 'number') {
      return res.status(400).json({ error: 'user_id is required and must be a number' });
    }
    next();
  };
  
  // Validate is_mentor
  const checkIsMentor = (req, res, next) => {
    const { is_mentor } = req.body;
    if (typeof is_mentor !== 'boolean') {
      return res.status(400).json({ error: 'is_mentor must be a boolean' });
    }
    next();
  };
  
  // Validate is_mentee
  const checkIsMentee = (req, res, next) => {
    const { is_mentee } = req.body;
    if (typeof is_mentee !== 'boolean') {
      return res.status(400).json({ error: 'is_mentee must be a boolean' });
    }
    next();
  };
  
  module.exports = {
    checkSubcategoryId,
    checkUserId,
    checkIsMentor,
    checkIsMentee,
  };