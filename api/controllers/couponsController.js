const pool = require('../connection_db');
const error = require('../utils/handle500Error');
const { validationResult } = require('express-validator');

exports.getAllCoupons = (req, res) => {
    pool.query('SELECT * FROM Coupons', (err, result) => {
        if (err) {
            return error.handleDatabaseError(err, res);
        } else {
            res.status(200).json(result);
        }
    });
};

exports.createCoupon = (req, res) => {
    const { details, cart_total_min, name, pourcentage, start_date, end_date } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    pool.query(
        'INSERT INTO Coupons (details, cart_total_min, name, pourcentage, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6)',
        [details, cart_total_min, name.toUpperCase(), pourcentage, start_date, end_date],
        (err, result) => {
            if (err) {
                return error.handleDatabaseError(err, res);
            } else {
                res.status(200).json(result);
            }
        }
    );
};

exports.deleteCoupon = (req, res) => {
    const couponId = req.body.id;
    pool.query('DELETE FROM Coupons WHERE id = $1', [couponId], (err, result) => {
        if (err) {
            return error.handleDatabaseError(err, res);
        }
        return res.status(201).json({ message: 'Coupon supprimé' });
    });
};
