const pool = require('../connection_db');
const error = require('../utils/handle500Error');
const { validationResult } = require('express-validator');

/**
 * Fetches all users with limited information: token, first name, last name, email, and creation date.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with user information
 */
exports.getAllUsers = (req, res) => {
    pool.query('SELECT token, first_name, last_name, email, created_at  FROM Users', (err, result) => {
        if (err) {
            error.handleDatabaseError(err, res);
        } else {
            res.status(200).json(result);
        }
    });
};

/**
 * Retrieves a user's basic information by ID (token).
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with user details
 */
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    pool.query('SELECT token, first_name, last_name, user_role FROM users WHERE token = $1', [userId], (err, result) => {
        if (err) {
            dbUtils.handleDatabaseError(err, res);
        }
        else {
            if (result.rows.length === 0) {
                res.status(404).json({ message: 'User not found' });
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
exports.getUserProfileById = (req, res) => {
    const userId = req.params.id;

    pool.query('SELECT token, first_name, last_name, date_of_birth, email, address_info, created_at, payment_info FROM users WHERE token = $1', [userId], (err, result) => {
        if (err) {
            dbUtils.handleDatabaseError(err, res);
        }
        else {
            if (result.rows.length === 0) {
                res.status(404).json({ message: 'User not found' });
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
exports.signUpUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, lastName, firstName, password, passwordValidation } = req.body;

    if (!email.trim() || !lastName.trim() || !firstName.trim() || !password.trim()) {
        return res.status(400).json({ errors: 'Tous les champs doivent être remplis' });
    }

    pool.query('SELECT email FROM Users WHERE email = $1', [email.toLowerCase()], (err, emailExists) => {
        if (err) {
            return dbUtils.handleDatabaseError(err, res);
        }

        if (emailExists.rows.length > 0) {
            return res.status(400).json({ errors: 'Cet email est déjà enregistré' });
        }

        if (password !== passwordValidation) {
            return res.status(400).json({ errors: 'Les mots de passe ne correspondent pas !' });
        }

        bcrypt.hash(password, 10, (hashError, hashedPassword) => {
            if (hashError) {
                return dbUtils.handleServerError(hashError, res);
            }

            pool.query(
                'INSERT INTO Users (email, last_name, first_name, password) VALUES ($1, $2, $3, $4)',
                [email.toLowerCase(), lastName.toLowerCase(), firstName.toLowerCase(), hashedPassword],
                (insertError) => {
                    if (insertError) {
                        return dbUtils.handleDatabaseError(insertError, res);
                    }

                    res.status(201).json({ message: 'Inscription réussie', success: true });
                }
            );
        });
    });
};

/**
 * Updates a user's main information such as first name and last name.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating the success or failure of the update process
 */
exports.updateUserMainInfos = (req, res) => {
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
                dbUtils.handleDatabaseError(err, res);
            } else {
                res.status(200).json({ message: 'Vos informations ont été mises à jour avec succès' });
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
exports.signInUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    pool.query('SELECT * FROM Users WHERE email = $1', [email.toLowerCase()], (queryError, user) => {
        if (queryError) {
            return dbUtils.handleDatabaseError(queryError, res);
        }

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" });
        }

        const storedPassword = user.rows[0].password;

        bcrypt.compare(password, storedPassword, (compareError, isPasswordValid) => {
            if (compareError) {
                return dbUtils.handleServerError(compareError, res);
            }

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Le mot de passe ne correspond pas' });
            }

            res.status(200).json({ message: 'Connexion réussie', success: true });
        });
    });
};

/**
 * Logs out a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating the success or failure of the logout process
 */
exports.logOutUser = (req, res) => {
    // Logique pour déconnecter un utilisateur
};