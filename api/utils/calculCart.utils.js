
/**
 * Calculates the cart total, considering discount and delivery cost.
 * 
 * @param {Array} cartItemsList - List of items in the cart.
 * @param {Object} discount - Discount object (if applicable).
 * @returns {Object} - Cart total information.
 */
const calculCart = (cartItemsList, discount = null) => {
    let cartTotal = { discount: null, subTotal: 0, totalDiscount: 0, total: 0, deliveryPrice: 0 };

    const subTotal = cartItemsList.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryPrice = subTotal > 69 ? 0 : 5.99;

    if (discount !== null) {
        const discountPercentage = discount.percentage * 0.01;
        const newSubtotal = subTotal * (1 - discountPercentage);
        const totalDiscount = subTotal - newSubtotal;

        cartTotal = {
            discount: discount.percentage,
            subTotal: newSubtotal,
            totalDiscount: totalDiscount,
            total: Number(newSubtotal + deliveryPrice),
            deliveryPrice: deliveryPrice
        };
    } else {
        cartTotal = {
            discount: null,
            subTotal: subTotal,
            totalDiscount: 0,
            total: Number(subTotal + deliveryPrice),
            deliveryPrice: deliveryPrice
        };
    }

    return cartTotal;
};

module.exports = { calculCart };
