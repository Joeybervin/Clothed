require('dotenv').config({ path: './.env' });
const cors = require('cors');
const express = require('express');
const path = require('path');
const pool = require('./connection_db.js');

const app = express();

// server port
const port = 5555;

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// static files
app.use(express.static(path.join(__dirname, 'public/')));

// routes
// ...
app.get('/', (req, res) => {
    pool.query('SELECT * FROM Products', (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Échec de la connexion à PostgreSQL', error: err.message });
        } else {
            res.json(result);
        }
    });
});

// handdle errors

// Définissez vos routes et gestionnaires de requêtes ici


app.listen(port, () => {
    console.log(`Clothed server listenning on port ${port}`);
});
