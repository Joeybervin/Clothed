const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);

router.post('/createOrder', orderController.createOrder);

router.put('/:id', orderController.updateOrder);


module.exports = router;