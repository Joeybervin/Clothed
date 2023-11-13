const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authentificationSecurity } = require('../middleware/authentificationSecurity.js');

router.get('/',authentificationSecurity('admin'), orderController.getAllOrders);
router.get('/',authentificationSecurity, orderController.getAllUserOrders);

router.post('/createOrder', authentificationSecurity,  orderController.createOrder);

router.put('/:id', authentificationSecurity('admin'), orderController.updateOrder);


module.exports = router;