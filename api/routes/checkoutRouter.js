const express = require('express');
const router = express.Router();
const { oneOf } = require('express-validator');
const checkoutController = require('../controllers/checkoutController');
const { adressSchema, paymentInfosSchema, editProfilSchema } = require('../middleware/validators/userSchema.js');

router.post('/customer', oneOf(editProfilSchema), checkoutController.saveOrderCustomerInfos);
router.post('/adressInfos',oneOf(adressSchema),  checkoutController.saveOrderAdressInfos);
router.post('/carNumberInfos', oneOf(paymentInfosSchema), checkoutController.saveOrderPaymentInfos);

module.exports = router;