const pool = require('../connection_db');
const error = require('../utils/handle500Error');
const { validationResult } = require('express-validator');


/**
 * Retrieves all coupons from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getAllCoupons = async(req, res) => {
    pool.query('SELECT * FROM Coupons', (err, result) => {
        if (err) {
            return error.handleDatabaseError(err, res);
        } else {
            return res.status(200).json(result);
        }
    });
};


/**
 * Creates a new coupon in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.createCoupon = async(req, res) => {
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
                return res.status(200).json(result);
            }
        }
    );
};


/**
 * Deletes a coupon from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.deleteCoupon = async(req, res) => {
    const couponId = req.body.id;
    pool.query('DELETE FROM Coupons WHERE id = $1', [couponId], (err, result) => {
        if (err) {
            return error.handleDatabaseError(err, res);
        }
        return res.status(201).json({ message: 'Coupon supprimé' });
    });
};
