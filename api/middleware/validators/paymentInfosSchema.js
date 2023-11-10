const { checkSchema } = require('express-validator');

const creditCardSchema = checkSchema({
    cardNumber: {
        notEmpty: {
            errorMessage: 'Le numéro de carte ne doit pas être vide',
        },
        isCreditCard: {
            errorMessage: 'Numéro de carte invalide',
        },
    },
    cardHolderName: {
        notEmpty: {
            errorMessage: 'Le nom du titulaire de la carte ne doit pas être vide',
        },
    },
    month: {
        isInt: {
            options: { min: 1, max: 12 },
            errorMessage: 'Le mois de validité de la carte est invalide',
        },
    },
    year: {
        isInt: {
            options: { min: new Date().getFullYear(), max: new Date().getFullYear() + 20 },
            errorMessage: 'L\'année de validité de la carte est invalide',
        },
    },
    cvc: {
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


