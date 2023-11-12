const { checkSchema } = require('express-validator');

/**
 * Validation schema for address information.
 * This schema uses express-validator to define validation rules
 * for the address-related data input in the application.
 */
const addressSchema = checkSchema({
    street: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Le champ rue ne doit pas être vide',
        },
        isLength: {
            options: { max: 150 },
            errorMessage: 'Le champ rue doit contenir au maximum 150 caractères',
        },
        matches: {
            options: /^[a-zA-Z0-9\s-,.']+$/,
            errorMessage: 'Le champ rue contient des caractères non autorisés',
        },
    },
    city: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Le champ ville ne doit pas être vide',
        },
        isLength: {
            options: { max: 50 },
            errorMessage: 'Le champ ville doit contenir au maximum 50 caractères',
        },
        matches: {
            options: /^[a-zA-Z\s-,.']+$/,
            errorMessage: 'Le champ ville contient des caractères non autorisés',
        },
    },
    country: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Onligatoire !',
        },
        isLength: {
            options: { max: 50 },
            errorMessage: 'max : 50',
        },
        matches: {
            options: /^[a-zA-Z\s-,.']+$/,
            errorMessage: 'Le champ ville contient des caractères non autorisés',
        },
    },
    postalCode: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Le champ code postal ne doit pas être vide',
        },
        isPostalCode: {
            errorMessage: 'Format de code postal invalide',
        },
    },
});


module.exports = { addressSchema };