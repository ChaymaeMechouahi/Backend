const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null ,
  database: 'stageProject'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

// Route pour récupérer tous les participants
router.get('/', (req, res) => {
  const query = `
    SELECT *
    FROM participant
  `;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la récupération des participants :', error);
      res.status(500).send('Erreur lors de la récupération des participants.');
    } else {
      res.send(results);
    }
  });
});

// Route pour récupérer un participant par son ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT *
    FROM participant
    WHERE id = ?
  `;
  connection.query(query, [id], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la récupération dess participants :', error);
      res.status(500).send('Erreur lors de la récupération des participants.');
    } else if (results.length === 0) {
      res.status(404).send('participant demandée n\'existe pas.');
    } else {
      res.send(results[0]);
    }
  });
});
// Route pour récupérer le nom d'une édition
router.get('/:id/nom', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT nom
    FROM participant
    WHERE id = ?
  `;
  connection.query(query, [id], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la récupération du nom :', error);
      res.status(500).send('Erreur lors de la récupération du nom.');
    } else if (results.length === 0) {
      res.status(404).send('Edition non trouvée.');
    } else {
      const nom = results[0].nom;
      res.send(nom);
    }
  });
});
// Route pour récupérer le prenom d'une édition
router.get('/:id/prenom', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT prenom
    FROM participant
    WHERE id = ?
  `;
  connection.query(query, [id], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la récupération du prenom :', error);
      res.status(500).send('Erreur lors de la récupération du prenom.');
    } else if (results.length === 0) {
      res.status(404).send('Edition non trouvée.');
    } else {
      const prenom = results[0].prenom;
      res.send(prenom);
    }
  });
});
// Route pour récupérer le pays d'une édition
router.get('/:id/pays', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT pays
    FROM participant
    WHERE id = ?
  `;
  connection.query(query, [id], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la récupération du pays :', error);
      res.status(500).send('Erreur lors de la récupération du pays.');
    } else if (results.length === 0) {
      res.status(404).send('Edition non trouvée.');
    } else {
      const pays = results[0].pays;
      res.send(pays);
    }
  });
});

module.exports = router;
