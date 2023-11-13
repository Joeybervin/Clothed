const pool = require('../connection_db');
const { checkOrderStockAvailability } = require('../utils/checkOrderStockAvailability.utils.js')
const { handleDatabaseError } = require('../utils/handle500Error.utils.js');


/**
 * Retrieves all orders
 * @param {Object} req - Incoming request
 * @param {Object} res - Outgoing response
**/
exports.getAllOrders = async (req, res) => {
    pool.query('SELECT * FROM Orders', (err, result) => {
        if (err) {
            return handleDatabaseError(err, res);
        }
        return res.status(200).json(result);
    });
};

/**
 * Retrieves all orders of the user
 * @param {Object} req - Incoming request
 * @param {Object} res - Outgoing response
**/
exports.getAllUserOrders = async (req, res) => {

    const email = req.user.email

    pool.query('SELECT * FROM Orders WHERE user_id = $1',[email], (err, result) => {
        if (err) {
            return handleDatabaseError(err, res);
        }
        return res.status(200).json(result.rows[0]);
    });
};

/**
 * Creates a new order
 * @param {Object} req - Incoming request with order details
 * @param {Object} res - Outgoing response
**/
exports.createOrder = async (req, res) => {
    const { orderInfos, discount_coupons_infos, user_token } = req.body;

    try {
        await pool.query('BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;');

        const createdOrder = await pool.query(
            'INSERT INTO "Order" (items, user_token, total_price, discount_coupons_infos) VALUES ($1, $2, $3, $4) RETURNING id',
            [orderInfos.items, user_token, orderInfos.total_price, discount_coupons_infos]
        );

        const orderId  = createdOrder.rows[0].id;

        const pendingOrders = await pool.query(
            "SELECT id, created_at, items FROM Orders WHERE processing_started_at IS NULL ORDER BY created_at DESC"
        );

        for (const pendingOrder of pendingOrders.rows) {
            const stockAvailable = checkOrderStockAvailability(pendingOrder.items);

            if (!stockAvailable) {
                await pool.query('UPDATE "Orders" SET order_states = $1, processing_started_at = $2 WHERE id = $3', ['rupture de stock', Date.now(),  orderId]);
                await pool.query('ROLLBACK');
                return res.status(400).json({ success: false, message: "Certains produits ne sont malheureusement plus disponibles" });
            }

            await pool.query('UPDATE "Order" SET order_states = $1, processing_started_at = $2 WHERE id = $3', ['en cours de préparation', Date.now(), orderId]);
        }

        await pool.query('COMMIT');
        return res.status(201).json({ success: true, message: "Commande passée avec succès" });
    } catch (err) {
        if (orderId) {
            await pool.query('DELETE FROM Orders WHERE id = $1', [orderId]);
        }
        await pool.query('ROLLBACK');
        return res.status(500).json({ success: false, message: "Nous rencontrons des problèmes, veuillez réessayer plus tard.", error: err });
    } finally {
        pool.release();
    }
};

/**
 * Updates the status of an order
 * @param {Object} req - Incoming request with update details
 * @param {Object} res - Outgoing response
**/
exports.updateOrder = async (req, res) => {
    const { update, order_id } = req.body.update;

    pool.query('UPDATE "order" SET order_states = $1 WHERE order_id = $2 RETURNING *', [update, order_id], (err, result) => {
        if (err) {
            return handleDatabaseError(err, res);
        } else {
            if (result.rowCount > 0) {
                return res.status(200).json({ success: true, message: `La commande ${order_id} a été mise à jour -> ${update}` });
            } else {
                return res.status(404).json({ success: false, message: `La commande avec l'ID ${order_id} est introuvable` });
            }
        }
    });
};



