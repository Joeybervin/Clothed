const { checkSchema } = require('express-validator');


/**
 * Validation schema for credit card information.
 * This schema utilizes express-validator to define validation rules
 * for the credit card data entered.
 */
const creditCardSchema = checkSchema({
    cardNumber: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Obligatoire !',
        },
        isCreditCard: {
            errorMessage: 'Numéro de carte invalide',
        },
        trim: true,
    },
    cardHolderName: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Obligatoire !',
        },
        isString: {
            errorMessage: 'Caractères invalides !',
        },
        matches: {
            options: /^[A-Za-z -]{1,40}$/,
            errorMessage: 'Caractères Invalides ! ',
        },
        trim: true,
    },
    month: {
        in: ['body'],
        isInt: {
            options: { min: 1, max: 12 },
            errorMessage: 'Le mois de validité de la carte est invalide',
        },
    },
    year: {
        in: ['body'],
        isInt: {
            options: { 
                min: new Date().getFullYear() % 100,
                max: (new Date().getFullYear() % 100) + 20
            },
            errorMessage: 'L\'année de validité de la carte est invalide',
        },
        custom: {
            options: (value, { req }) => {
                const currentYear = new Date().getFullYear() % 100; 
                const inputYear = new Date(value).getFullYear % 100; 
                const inputMonth = parseInt(req.body.month);
                const currentMonth = new Date().getMonth() + 1;

                if ((inputYear === currentYear && inputMonth < currentMonth)) {
                    throw new Error('La date de fin est antérieure à la date actuelle');
                }

                return true;
            },
        },
    },
    cvc: {
        in: ['body'],
        isLength: {
            options: { min: 3, max: 4 },
            errorMessage: 'Le code de sécurité doit être entre 3 et 4 caractères',
        },
        isNumeric: {
            errorMessage: 'Le code de sécurité doit être numérique',
        },
    },
});


module.exports = { creditCardSchema };


