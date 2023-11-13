const pool = require('../connection_db');
const { handleDatabaseError, handleServerError } = require('../utils/handle500Error.utils');
const argon2 = require('argon2');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


/**
 * Fetches all users with limited information: token, first name, last name, email, and creation date.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with user information
 */
exports.getAllUsers = (req, res) => {
    pool.query('SELECT token, first_name, last_name, email, created_at  FROM Users', (err, result) => {
        if (err) {
            handleDatabaseError(err, res);
        } else {
            return res.status(200).json(result);
        }
    });
};

/**
 * Retrieves a user's basic information by ID (token).
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with user details
 */
exports.getUserById = async(req, res) => {
    const userId = req.params.id;

    pool.query('SELECT token, first_name, last_name, user_role FROM users WHERE token = $1', [userId], (err, result) => {
        if (err) {
            handleDatabaseError(err, res);
        }
        else {
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                res.json(result.rows[0]);
            }
        }
    });
};

/**
 * Retrieves a user's complete profile information by ID (token).
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with the user's detailed profile
 */
exports.getUserProfileById = async(req, res) => {
    const userId = req.params.id;

    pool.query('SELECT token, first_name, last_name, date_of_birth, email, address_info, created_at, payment_info FROM users WHERE token = $1', [userId], (err, result) => {
        if (err) {
            handleDatabaseError(err, res);
        }
        else {
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                res.json(result.rows[0]);
            }
        }
    });
};

/**
 * Registers a new user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating success or failure of the registration process
 */
exports.signUpUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, lastName, firstName, password, passwordValidation } = req.body;

        const emailExists = await pool.query('SELECT email FROM Users WHERE email = $1', [email.toLowerCase()]);

        if (emailExists.rows.length > 0) {
            return res.status(400).json({ errors: 'Cet email est déjà enregistré' });
        }

        const hashedPassword = await argon2.hash(password);

        const result = await pool.query(
            'INSERT INTO Users (email, last_name, first_name, password) VALUES ($1, $2, $3, $4)',
            [email.toLowerCase(), lastName.toLowerCase(), firstName.toLowerCase(), hashedPassword]
        );

        if (result.rowCount === 1) {
            req.session.cart = { cart: [] };

            const tokenPayload = {
                email: email.toLowerCase(),
                role: 'defaultRole' // Remplacer 'defaultRole' par le rôle par défaut si nécessaire
            };

            const token = jwt.sign(tokenPayload, process.env.SESSION_SECRET, { expiresIn: '24h' });

            return res.status(201).json({ message: 'Inscription réussie', success: true, token });
        } else {
            return res.status(404).json({ message: "Erreur lors de la création de l'utilisateur" });
        }
    } catch (error) {
        return handleServerError(error, res);
    }
};

/**
 * Updates a user's main information such as first name and last name.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating the success or failure of the update process
 */
exports.updateUserMainInfos = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { lastName, firstName, email } = req.body;

    pool.query(
        'UPDATE Users SET last_name = $1, first_name = $2 WHERE email = $3',
        [lastName.toLowerCase(), firstName.toLowerCase(), email.toLowerCase()],
        (err) => {
            if (err) {
                handleDatabaseError(err, res);
            } else {
                return res.status(200).json({ message: 'Vos informations ont été mises à jour avec succès' });
            }
        }
    );
};

/**
 * Authenticates a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating success or failure of the authentication process
 */
exports.signInUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    pool.query('SELECT token, first_name, last_name, email, user_role, password FROM Users WHERE email = $1', [email.toLowerCase()], async (err, user) => {
        if (err) {
            return handleDatabaseError(err, res);
        }

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" });
        }

        const storedPassword = user.rows[0].password;

        try {
            if (await argon2.verify(storedPassword, password)) {

                req.session.cart = {
                    cart : []
                };

                const token = jwt.sign({
                    email: user.rows[0].email,
                    role: user.rows[0].user_role
                }, process.env.SESSION_SECRET, { expiresIn: '24h' });
        

                return res.status(200).json({ token, message: 'Connexion réussie', success: true });
            } else {
                return res.status(401).json({ message: 'Le mot de passe ne correspond pas' });
            }
        } catch (err) {
            return handleServerError(error, res);
        }
    });
};

/**
 * Logs out a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating the success or failure of the logout process
 */
exports.logOutUser = async(req, res) => {
    req.user = null;
    const invalidToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1' });

    res.status(200).json({ message: 'Déconnexion réussie', invalidToken });
};