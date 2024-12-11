const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');

// Отримати відгуки для книги
router.get('/:bookId', ReviewController.getReviewsForBook);

// Додати відгук
router.post('/:bookId', ReviewController.addReview);

module.exports = router;
