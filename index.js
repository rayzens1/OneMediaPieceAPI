// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

// Active CORS pour permettre les requêtes depuis votre front-end React
app.use(cors());

// Configuration de la connexion MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: '123',
  database: 'onemediapiece'
});

// Connecter au serveur MySQL
connection.connect(error => {
  if (error) {
    console.error('Erreur lors de la connexion à la BD : ', error);
  } else {
    console.log('Connecté à la base de données');
  }
});

// Endpoint pour récupérer la liste des articles
app.get('/api/articles', (req, res) => {
  connection.query('SELECT * FROM articles ORDER BY id DESC', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
