const handleDatabaseError = (err, res, message = null) => {
    console.error('DATABASE Error:', err);
    return res.status(500).json({ message: message === null ? 'Erreur interne du serveur liée à la base de données. Veuillez réessayer ultérieurement' : message });
};

const handleServerError = (res, err, message = null) => {
    console.error('SERVER Error:', err);
    return res.status(500).json({ message: message === null ? 'Erreur interne du serveur. Veuillez réessayer ultérieurement' : message});
};

module.exports = { handleDatabaseError, handleServerError };




