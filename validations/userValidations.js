//validate first name
const checkFirstName = (req, res, next) => {
    const { first_name } = req.body;
    if (!first_name || typeof first_name !== 'string') {
      return res.status(400).json({ error: 'First name is required and must be a string' });
    }
    next();
  };

  // Validate last name
const checkLastName = (req, res, next) => {
    const { last_name } = req.body;
    if (!last_name || typeof last_name !== 'string') {
      return res.status(400).json({ error: 'Last name is required and must be a string' });
    }
    next();
  };

  // Validate email format
const validateEmail = (req, res, next) => {
    const { email } = req.body;
    console.log('Email being validated:', email); // Log the email being validated
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required' });
    }
    next();
  };

  module.exports = {
    checkFirstName,
    checkLastName,
    validateEmail,
  };