// Validate subcategory_id
const checkCategoryId = (req, res, next) => {
    const { category_id } = req.body;
    if (!category_id || typeof category_id !== 'number') {
      return res.status(400).json({ error: 'category_id is required and must be a number' });
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
    checkCategoryId,
    checkUserId,
    checkIsMentor,
    checkIsMentee,
  };