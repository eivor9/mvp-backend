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
  const checkCategoryId = (req, res, next) => {
    const { category_id } = req.body;
    if (!category_id || typeof category_id !== 'number') {
      return res.status(400).json({ error: 'category_id is required and must be a number' });
    }
    next();
  };
  
  // Validate subcategory_id
  const checkSubcategoryId = (req, res, next) => {
    const { subcategory_id } = req.body;
    if (!subcategory_id || typeof subcategory_id !== 'number') {
      return res.status(400).json({ error: 'subcategory_id is required and must be a number' });
    }
    next();
  };
  
  module.exports = {
    checkMentorId,
    checkMenteeId,
    checkCategoryId,
    checkSubcategoryId,
  };