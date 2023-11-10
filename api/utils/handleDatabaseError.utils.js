const handleDatabaseError = (err, res) => {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Internal Server Error', status : 500 , error: err.message });
};

module.exports = {handleDatabaseError};



