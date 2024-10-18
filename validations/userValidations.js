//validate first name
const checkName = (req, res, next) => {
    const { name } = req.body;
    if (name ) {
      const nameParts = name.trim().split(/\s+/);
      if (nameParts.length < 2) {
        return res.status(400).json({ error: 'Please enter your first and last name' });
      }
    }
    next();
  };

  // Validate email format
const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required' });
    }
    next();
  };

  module.exports = {
    checkName,
    validateEmail,
  };
