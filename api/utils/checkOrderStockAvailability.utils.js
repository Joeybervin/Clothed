/**
 * Checks stock availability for an order
 * @param {Array} orderItems - List of order items with ID and quantity
 * @returns {Boolean} - Stock availability for the order
**/
const checkOrderStockAvailability = async (orderItems, checkout = false) => {
    try {
        const productsToCheck = orderItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        const availableStocks = await pool.query(
            'SELECT id, inventory FROM products WHERE id IN ($1:csv) FOR UPDATE',
            [productsToCheck.map(item => item.productId)]
        );

        
        if (checkout) {
            const availabilitylist = [];
            for (const product of productsToCheck) {
                const availableProduct = availableStocks.rows.find(row => row.id === product.productId);
                if (!availableProduct || availableProduct.inventory < product.quantity) {
                    availabilitylist.push({productId: product.id , quantity: product.inventory})
                }
            }
            return availableProduct
        }
        else {
            let allAvailable = true;

            for (const product of productsToCheck) {
                const availableProduct = availableStocks.rows.find(row => row.id === product.productId);
                if (!availableProduct || availableProduct.inventory < product.quantity) {
                    allAvailable = false;
                    break;
                }
            }
            return allAvailable;
        }

        
    } catch (error) {
        throw error;
    }
};

exports.module = { checkOrderStockAvailability };