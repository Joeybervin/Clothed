const pool = require('../connection_db');


/**
 * Retrieves all orders
 * @param {Object} req - Incoming request
 * @param {Object} res - Outgoing response
**/
exports.getAllOrders = async (req, res) => {
    pool.query('SELECT * FROM Orders', (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Problème serveur', error: err.message });
        }

        res.status(200).json(result);
    });
};


/**
 * Checks stock availability for an order
 * @param {Array} orderItems - List of order items with ID and quantity
 * @returns {Boolean} - Stock availability for the order
**/
const checkStockAvailabilityOfOrder = async (orderItems) => {
    try {
        const productsToCheck = orderItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        const availableStocks = await pool.query(
            'SELECT id, inventory FROM products WHERE id IN ($1:csv) FOR UPDATE',
            [productsToCheck.map(item => item.productId)]
        );

        let allAvailable = true;
        for (const product of productsToCheck) {
            const availableProduct = availableStocks.rows.find(row => row.id === product.productId);
            if (!availableProduct || availableProduct.inventory < product.quantity) {
                allAvailable = false;
                break;
            }
        }

        return allAvailable;
    } catch (error) {
        throw error;
    }
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

        const orderId  = createdOrder.rows[0];

        const pendingOrders = await pool.query(
            "SELECT id, created_at, items FROM Orders WHERE processing_started_at IS NULL ORDER BY created_at DESC"
        );

        for (const pendingOrder of pendingOrders.rows) {
            const stockAvailable = await checkStockAvailabilityOfOrder(pendingOrder.items);

            if (!stockAvailable) {
                await pool.query('UPDATE "Orders" SET order_status = $1, processing_started_at = $2 WHERE id = $3', ['rupture de stock', Date.now(),  orderId]);
                await pool.query('ROLLBACK');
                return res.status(400).json({ success: false, message: "Certains produits ne sont malheureusement plus disponibles" });
            }

            await pool.query('UPDATE "Order" SET order_status = $1, processing_started_at = $2 WHERE id = $3', ['en cours de préparation', Date.now(), orderId]);
        }

        await pool.query('COMMIT');
        return res.status(201).json({ success: true, message: "Commande passée avec succès" });
    } catch (err) {
        await pool.query('DELETE FROM Orders WHERE id = $1', [orderId]);
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

    try {
        const result = await pool.query('UPDATE "order" SET order_status = $1 WHERE order_id = $2 RETURNING *', [update, order_id]);

        if (result.rowCount > 0) {
            res.status(200).json({ success: true, message: `La commande ${order_id} a été mise à jour -> ${update}` });
        } else {
            res.status(404).json({ success: false, message: `La commande avec l'ID ${order_id} est introuvable` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de la commande", error: error });
    }
};


