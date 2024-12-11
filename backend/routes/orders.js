const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateAdmin = require('../middleware/authMiddleware');

router.get('/', authenticateAdmin, orderController.getAllOrders); // Получить все заказы
router.post('/', orderController.createOrder); // Создать заказ

module.exports = router;
