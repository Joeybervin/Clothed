const pool = require('../connection_db');
const dbUtils = require('../utils/handleDatabaseError.utils');
const { validationResult } = require('express-validator');

exports.getAllUsers = async (req, res) => {
    try {
        await pool.query('SELECT token, first_name, last_name, email, created_at  FROM Users', (err, result) => {
            if (err) {
                dbUtils.handleDatabaseError(err, res);
            } else {
                res.json({ result: result });
            }
        });

    } catch (err) {

    }
};

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

exports.signUpUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        
        const { email, lastName, firstName, password, passwordValidation } = req.body;

        if (!email.trim() || !lastName.trim() || !firstName.trim() || !password.trim()) {
            return res.status(400).json({ errors: 'Tous les champs doivent être remplis' });
        }

        const emailExists = await pool.query('SELECT email FROM Users WHERE email = $1', [email.toLowerCase()]);
        if (emailExists.rows.length > 0) {
            return res.status(400).json({ errors: 'Cet email est déjà enregistré' });
        }

        if ( password !== passwordValidation) {
            return res.status(400).json({ errors: 'Les mot de passe ne correspondent pas !'});
        }

        const hashedPassword = await argon2.hash(password);

        await pool.query(
            'INSERT INTO Users (email, last_name, first_name, password) VALUES ($1, $2, $3, $4)',
            [email.toLowerCase(), lastName.toLowerCase(), firstName.toLowerCase(), hashedPassword]
        );

        res.status(201).json({ message: 'Inscription réussie' , success : true }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription. Veuillez réesayer dans quelques instants' });
    }
};

exports.updateUserMainInfos = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const {lastName, firstName, email} = req.body;

        await pool.query(
            'UPDATE Users SET last_name = $1, first_name = $2 WHERE email = $3',
            [lastName.toLowerCase(), firstName.toLowerCase(), email.toLowerCase()]
        );
        res.status(200).json({ message: 'Vos informations ont été mises à jour avec succès' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la modifications de vos informations. Veuillez réesayer dans quelques instants' });
    }
    
};

exports.signInUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await pool.query('SELECT * FROM Users WHERE email = $1', [email.toLowerCase()]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" });
        }

        const storedPassword = user.rows[0].password;
        const isPasswordValid = await bcrypt.compare(password, storedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Le mot de passe ne correspond pas' });
        }

        res.status(200).json({ message: 'Connexion réussie', success : true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion. Veuillez recommencer dans quelques instant.' });
    }

};

exports.logOutUser = (req, res) => {
    // Logique pour déconnecter un utilisateur
};
