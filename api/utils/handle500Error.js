const handleDatabaseError = (res, message = null) => {
    res.status(500).json({ message: message === nuul ? 'Erreur interne du serveur liée à la base de données. Veuillez réessayer ultérieurement' : message });
};

const handleServerError = (res, err) => {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Erreur interne du serveur. Veuillez réessayer ultérieurement' });
};

module.exports = { handleDatabaseError, handleServerError };




