// queries/testimonials.js

const db = require('../db/dbConfig.js');

// Get all testimonials with category name
const getAllTestimonials = async () => {
  try {
    const testimonials = await db.any(`
      SELECT 
        t.id, 
        t.body, 
        t.reviewer_id, 
        t.mentor_id, 
        t.mentee_id, 
        c.name AS category_name 
      FROM testimonials t
      LEFT JOIN categories c ON t.category_id = c.id
    `);
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return error;
  }
};

module.exports = {
  getAllTestimonials,
};
