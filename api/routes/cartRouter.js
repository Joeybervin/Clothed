const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/checkout', cartController.getCartCheckout);

router.post('/checkout/discount', cartController.getCartDiscount);

module.exports = router;