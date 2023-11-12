const { checkSchema } = require('express-validator');


const couponSchema = checkSchema({
    details: {
        isLength: {
            options: { max: 255 },
            errorMessage: 'Le champ "details" doit contenir au maximum 255 caractères',
        },
    },
    cart_total_min: {
        isNumeric: {
            errorMessage: 'Le champ "cart_total_min" doit être un nombre',
        },
        custom: {
            options: (value) => {
                if (value < 0) {
                    throw new Error('Le champ "cart_total_min" doit être supérieur ou égal à zéro');
                }
                return true;
            },
        },
    },
    name: {
        notEmpty: {
            errorMessage: 'Le champ "name" ne doit pas être vide',
        },
        isLength: {
            options: { max: 25 },
            errorMessage: 'Le champ "name" doit contenir au maximum 25 caractères',
        },
    },
    pourcentage: {
        isFloat: {
            errorMessage: 'Le champ "pourcentage" doit être un nombre décimal',
        },
        custom: {
            options: (value) => {
                if (value < 0 || value > 100) {
                    throw new Error('Le champ "pourcentage" doit être compris entre 0 et 100');
                }
                return true;
            },
        },
    },
    start_date: {
        custom: {
            options: (value) => {
                const startDate = new Date(value);
                const currentDate = new Date();

                if (startDate < currentDate) {
                    throw new Error('La date de début doit être postérieure à la date actuelle');
                }

                return true;
            },
        },
    },
    end_date: {
        custom: {
            options: (value, { req }) => {
                const endDate = new Date(value);
                const startDate = new Date(req.body.start_date);

                if (endDate <= startDate) {
                    throw new Error('La date de fin doit être postérieure à la date de début');
                }

                return true;
            },
        },
    },
});

module.exports = {couponSchema};
