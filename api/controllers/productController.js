const pool = require('../connection_db');

/**
 * Retrieves all available products in stock
 * @param {Object} req - Requête client
 * @param {Object} res - Réponse serveur
**/
exports.getAllProducts = (req, res) => {
    pool.query('SELECT * FROM Products WHERE inventory > 0', (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Problème serveur', error: err.message });
        } 
            return res.json(result);
    });
};

/**
 * Retrieves products filtered by a specific category
 * @param {Object} req - Requête client contenant le paramètre de catégorie
 * @param {Object} res - Réponse serveur
**/
exports.getProductsFilteredByCategory = (req, res) => {
    const category = req.params.category
    pool.query('SELECT * FROM Products WHERE category = $1', [category], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Problème serveur', error: err.message });
        }
        return res.json(result);
    })
};

/**
 * Adds a new product to the database
 * @param {Object} req - Requête client contenant les détails du nouveau produit
 * @param {Object} res - Réponse serveur
**/
exports.createProduct = (req, res) => {
    const {name, price, inventory, category, gender} = req.body;
    pool.query('INSERT INTO Product (name, price, inventory, category, gender) WHERE VALUES ($1, $2, $3, $4, $5)', [name, price, inventory, category, gender], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Problème serveur', error: err.message });
        }
        return res.status(200).json({message: "Produit ajouté"});
    })
};

/**
 * Updates the stock of a specific product
 * @param {Object} req - Requête client contenant l'ID du produit et la quantité à modifier
 * @param {Object} res - Réponse serveur
**/
exports.updateProductStock = (req, res) => {
    const {id, stock} = req.body
    pool.query('UPDATE Products SET inventoty = $1 WHERE id = $2', [stock, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Problème serveur', error: err.message });
        }
        return res.status(201).json({message: `${stock} /unité ont été ajouté`});
    })
};

/**
 * Deletes a specific product from the database
 * @param {Object} req - Requête client contenant l'ID du produit à supprimer
 * @param {Object} res - Réponse serveur
**/
exports.deleteProduct = (req, res) => {
    const productId = req.body.id;
    pool.query('DELETE Products WHERE id = $1;', [productId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Problème serveur', error: err.message });
        }
        return res.status(201).json({message: "Produit supprimé"});
    })
};

