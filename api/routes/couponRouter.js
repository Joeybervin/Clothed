const express = require('express');
const router = express.Router();
const { oneOf } = require('express-validator');
const couponController = require('../controllers/couponController');
const { couponSchema } = require('../middleware/validators/couponSchema.js');


router.get('/', couponController.getAllCoupons);

router.post('/create', oneOf(couponSchema),  couponController.createCoupon);

router.delete('/delete', couponController.deleteCoupon);

module.exports = router;