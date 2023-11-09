const pool = require('../connection_db');

// Exemple dans MessageController.js
exports.getAllMessages = (req, res) => {
    pool.query('SELECT * FROM Messages', (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Échec de la connexion à PostgreSQL', error: err.message });
        } else {
            res.json(result);
        }
    });
};

exports.getMessageById = (req, res) => {
    // Logique pour récupérer un produit par ID
};

exports.createMessage = (req, res) => {
    // Logique pour créer un nouveau produit
};

exports.updateMessage = (req, res) => {
    // Logique pour mettre à jour un produit par ID
};

exports.deleteMessage = (req, res) => {
    // Logique pour supprimer un produit par ID
};

