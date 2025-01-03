const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/register', clientController.register);
router.post('/login', clientController.login);

module.exports = router;
