const { validationResult } = require('express-validator');

exports.saveOrderCustomerInfos = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {firstName, lastName, email, user_token} = req.body

    return res.status(200).json({firstName, lastName, email, user_token});
};

exports.saveOrderAdressInfos = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {street, city, country, postalCode} = req.body

    return res.status(200).json({street, city, country, postalCode});
};

exports.saveOrderPaymentInfos = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {cardHolderName, cardNumber, expirationMonth, expirationYear, cvc} = req.body

    return res.status(200).json({cardHolderName, cardNumber, expirationMonth, expirationYear, cvc});
};