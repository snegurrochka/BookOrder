const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateAdmin = require('../middleware/authMiddleware');

router.get('/', bookController.getAllBooks); // Отримати всі книги
router.post('/', authenticateAdmin, bookController.addBook); // Додати нову книгу
router.delete('/:id', authenticateAdmin, bookController.deleteBook); // Видалити книгу

module.exports = router;