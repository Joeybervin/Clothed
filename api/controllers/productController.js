const pool = require('../connection_db');

// Exemple dans productController.js
exports.getAllProducts = (req, res) => {
    pool.query('SELECT * FROM Products WHERE inventory > 0', (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Échec de la connexion à PostgreSQL', error: err.message });
        } else {
            res.json(result);
        }
    });
};

exports.getProductById = (req, res) => {
    // Logique pour récupérer un produit par ID
};

exports.createProduct = (req, res) => {
    // Logique pour créer un nouveau produit
};

exports.updateProduct = (req, res) => {
    // Logique pour mettre à jour un produit par ID
};

exports.deleteProduct = (req, res) => {
    // Logique pour supprimer un produit par ID
};

