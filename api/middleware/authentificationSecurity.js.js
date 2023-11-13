const jwt = require('jsonwebtoken');
const  { handleDatabaseError } = require('../utils/handle500Error.utils');

const authentificationSecurity = (role = 'customer') => (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token non fourni' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const userEmail = decoded.email;
        const userRole = decoded.role; 

        if (role !== 'customer' && role !== userRole) {
            return res.status(403).json({ message: "Accès refusé" });
        }

        pool.query('SELECT * FROM users WHERE email = $1', [userEmail], (error, results) => {
            if (error) {
                handleDatabaseError(err, res)
            }

            if (results.rows.length === 0) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }

            next();
        });
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide' });
    }
};

module.exports = { authentificationSecurity };
