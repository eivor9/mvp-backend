// controllers/testimonialsController.js
const express = require('express');
const router = express.Router();
const { getAllTestimonials } = require('../queries/testimonials');

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await getAllTestimonials();
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
