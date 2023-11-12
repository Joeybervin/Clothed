const pool = require('../connection_db');
const calculateCart = require('../utils/calculCart.utils');

/**
 * Checks the availability of items in the shopping cart.
 * 
 * @param {object} req - Express request object containing the cart items.
 * @param {object} res - Express response object.
 * @returns {object} - Response indicating the availability status or a list of items with stock issues.
 */
exports.getCartCheckout = (req, res) => {
    const cartItems = req.body.cartItems;
    const cartTotal = calculateCart(cartItems);

    if (cartItems.length === 0) {
        return res.status(400).json({ message: "Le panier est vide." });
    }

    try {
        const stockIssues = checkStockAvailabilityOfOrder(cartItems, true);

        if (stockIssues.length > 0) {
            return res.status(200).json({ available: false, stockIssues, cartTotal : cartTotal });
        } else {
            return res.status(200).json({ available: true, cartTotal });
        }
    } catch (err) {
        return res.status(500).json({ message: "Une erreur s'est produite lors de la vérification du stock" });
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

