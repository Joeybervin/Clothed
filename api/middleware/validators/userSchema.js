const { checkSchema } = require('express-validator');

/**
 * Validation schema for user creation.
 * This schema uses express-validator to define validation rules
 * for the data sent during user creation.
 *
 * @typedef {Object} CreateUserSchema
 * @property {Object} email - User's email.
 * @property {string} email.notEmpty - Email should not be empty.
 * @property {string} email.isEmail - Email should be in a valid format.
 * @property {string} email.matches - Email should match a specific pattern.
 * @property {string} email.isLength - Email should not exceed 35 characters.
 * @property {Object} password - User's password.
 * @property {string} password.isLength - Password should be between 6 and 30 characters.
 * @property {string} password.matches - Password should match a specific pattern.
 * @property {Object} firstName - User's first name.
 * @property {string} firstName.notEmpty - First name should not be empty.
 * @property {string} firstName.isLength - First name should be between 2 and 20 characters.
 * @property {string} firstName.matches - First name should match a specific pattern.
 * @property {Object} lastName - User's last name.
 * @property {string} lastName.notEmpty - Last name should not be empty.
 * @property {string} lastName.isLength - Last name should be between 2 and 20 characters.
 * @property {string} lastName.matches - Last name should match a specific pattern.
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
    },
});


/**
 * Validation schema for user sign-in.
 * This schema uses express-validator to define validation rules
 * for the data sent during user sign-in.
 *
 * @typedef {Object} SignInUserSchema
 * @property {Object} email - User's email.
 * @property {string} email.notEmpty - Email should not be empty.
 * @property {string} email.isEmail - Email should be in a valid format.
 * @property {string} email.matches - Email should match a specific pattern.
 * @property {Object} password - User's password.
 * @property {string} password.isLength - Password should be between 6 and 30 characters.
 * @property {string} password.matches - Password should not contain certain characters.
 */
const signInUserSchema = checkSchema({
    email: {
        notEmpty: {
            errorMessage: 'Adresse email invalide',
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
    },
    password: {
        isLength: {
            options: { min: 6, max: 30 },
            errorMessage: 'Mot de passe invalide',
        },
        custom: {
            options: (value) => !/[(){}|\s,;:><]/.test(value),
            errorMessage: 'Mot de passe invalide',
        },
    },
});

const editProfilSchema = checkSchema({
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
    },
})


module.exports = {signUpUserSchema, signInUserSchema, editProfilSchema};
