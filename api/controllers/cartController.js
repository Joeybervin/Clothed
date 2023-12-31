const pool = require('../connection_db');
const calculateCart = require('../utils/calculCart.utils');
const { handleServerError } = require('../utils/handle500Error.utils');
const { checkOrderStockAvailability } = require('../utils/checkOrderStockAvailability.utils');

/**
 * Checks the availability of items in the shopping cart.
 * 
 * @param {object} req - Express request object containing the cart items.
 * @param {object} res - Express response object.
 * @returns {object} - Response indicating the availability status or a list of items with stock issues.
 */
exports.getCartCheckout = async(req, res) => {
    const cartItems = req.session.cart;
    const cartTotal = calculateCart(cartItems);

    if (cartItems.length === 0) {
        return res.status(200).json({ message: "Le panier est vide." }); 
    }

    try {
        const stockIssues = checkOrderStockAvailability(cartItems, true);

        if (stockIssues.length > 0) {
            return res.status(200).json({ available: false, stockIssues, cartTotal });
        } else {
            return res.status(200).json({ available: true, cartTotal });
        }
    } catch (err) {
        return handleServerError(err, res, 'Erreur interne lors du traitement de votre commande, votre commande à été annulée. Vous ne serez pas débité');
    }
};

/**
 * Verifies and applies a discount code to the cart
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - Returns coupon information if valid, otherwise returns an error message
 */
exports.getCartDiscount = async (req, res) => {
    const { discount, cartItems } = req.body;

    try {
        const discountInfo = await pool.query('SELECT * FROM Coupons WHERE name = $1', [discount]);

        if (discountInfo.rows.length === 0) {
            return res.status(404).json({ message: "Code promo inconnu" });
        }

        const currentDate = Date.now();

        if (
            (currentDate >= discountInfo.rows[0].start_date) &&
            (
                !discountInfo.rows[0].end_date ||
                (currentDate <= discountInfo.rows[0].end_date)
            )
        ) {
            const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

            if (total >= discountInfo.rows[0].cart_total_min) {
                const discountedTotal = calculateCart(cartItems, discountInfo.rows[0]);
                return res.status(200).json({ discountInfo: discountInfo.rows[0], message: "Réduction appliquée !", cartTotal: discountedTotal });
            } else {
                return res.status(400).json({ message: "Code promo invalide" });
            }
        } else {
            return res.status(400).json({ message: "Code promo invalide" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Erreur, veuillez réessayer ultérieurement" });
    }
};

