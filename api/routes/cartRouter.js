const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authentificationSecurity } = require('../middleware/authentificationSecurity.js');

router.get('/checkout', cartController.getCartCheckout);

router.post('/checkout/discount', cartController.getCartDiscount);

module.exports = router;