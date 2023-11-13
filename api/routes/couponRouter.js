const express = require('express');
const router = express.Router();
const { oneOf } = require('express-validator');
const couponController = require('../controllers/couponController');
const { couponSchema } = require('../middleware/validators/couponSchema.js');
const { authentificationSecurity } = require('../middleware/authentificationSecurity.js');


router.get('/', authentificationSecurity('admin'), couponController.getAllCoupons);

router.post('/create', oneOf(couponSchema), authentificationSecurity('admin'),  couponController.createCoupon);

router.delete('/delete', authentificationSecurity('admin'), couponController.deleteCoupon);

module.exports = router;