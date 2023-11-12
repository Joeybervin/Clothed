const { checkSchema } = require('express-validator');

/**
 * Validation schema for user creation.
 * This schema uses express-validator to define validation rules
 * for the data sent during user creation.
 */
const signUpUserSchema = checkSchema({
    email: {
        notEmpty: {
            errorMessage: 'L\'adresse email ne doit pas être vide',
        },
        isEmail: {
            errorMessage: 'Adresse email invalide',
        },
        matches: {
            options: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            errorMessage: 'L\'adresse email contient des caractères invalides',
        },
        isLength: {
            options: { max: 35 },
            errorMessage: 'L\'adresse email ne doit pas dépasser 35 caractères',
        },
        normalizeEmail: true,
        trim: true,
    },
    password: {
        isLength: {
            options: { min: 6, max: 30 },
            errorMessage: 'Le mot de passe doit contenir entre 6 et 30 caractères',
        },
        matches: {
            options: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
            errorMessage: 'Le mot de passe doit contenir au moins une lettre majuscule et un chiffre',
        },
        custom: {
            options: (value) => !/[(){}|\s,;:><]/.test(value),
            errorMessage: 'Le mot de passe contient des caractères non autorisés : (){}|,;:><',
        },
        trim: true,
    },
    firstName: {
        notEmpty: {
            errorMessage: 'Le prénom ne doit pas être vide',
        },
        isLength: {
            options: { min: 2, max: 20 },
            errorMessage: 'Le prénom doit contenir entre 2 et 20 caractères',
        },
        matches: {
            options: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/,
            errorMessage: 'Le prénom contient des caractères invalides',
        },
        trim: true,
    },
    lastName: {
        notEmpty: {
            errorMessage: 'Le nom ne doit pas être vide',
        },
        isLength: {
            options: { min: 2, max: 20 },
            errorMessage: 'Le nom doit contenir entre 2 et 20 caractères',
        },
        matches: {
            options: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/,
            errorMessage: 'Le nom contient des caractères invalides',
        },
        trim: true,
    },
});


/**
 * Validation schema for user sign-in.
 * This schema uses express-validator to define validation rules
 * for the data sent during user sign-in.
 */
const signInUserSchema = checkSchema({
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Obligatoire !',
        },
        isEmail: {
            errorMessage: 'Adresse email invalide',
        },
        matches: {
            options: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            errorMessage: 'Adresse email invalide',
        },
        isLength: {
            options: { max: 35 },
            errorMessage: 'Adresse email invalide',
        },
        normalizeEmail: true,
        trim: true,
    },
    password: {
        in: ['body'],
        isLength: {
            options: { min: 6, max: 30 },
            errorMessage: 'Mot de passe invalide',
        },
        custom: {
            options: (value) => !/[(){}|\s,;:><]/.test(value),
            errorMessage: 'Mot de passe invalide',
        },
        trim: true,
    },
});


/**
 * Validation schema for editing user profile.
 * This schema uses express-validator to define validation rules
 * for the data sent when editing a user profile.
 */
const editProfilSchema = checkSchema({
    firstName: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Le prénom ne doit pas être vide',
        },
        isLength: {
            options: { min: 2, max: 20 },
            errorMessage: 'Le prénom doit contenir entre 2 et 20 caractères',
        },
        matches: {
            options: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/,
            errorMessage: 'Le prénom contient des caractères invalides',
        },
        trim: true,
    },
    lastName: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Le nom ne doit pas être vide',
        },
        isLength: {
            options: { min: 2, max: 20 },
            errorMessage: 'Le nom doit contenir entre 2 et 20 caractères',
        },
        matches: {
            options: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/,
            errorMessage: 'Le nom contient des caractères invalides',
        },
        trim: true,
    },
})


module.exports = {signUpUserSchema, signInUserSchema, editProfilSchema};
