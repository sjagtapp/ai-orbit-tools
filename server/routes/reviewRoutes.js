const express = require('express');
const { getReviews, createReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/tools/:id/reviews', getReviews);
router.post('/tools/:id/reviews', createReview);

module.exports = router;
