const express = require('express');
const axios = require('axios');
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

// Route pour récupérer toutes les éditions
router.get('/', (req, res) => {
  const query = `
    SELECT *
    FROM edition
  `;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la récupération des éditions :', error);
      res.status(500).send('Erreur lors de la récupération des éditions.');
    } else {
      res.status(200).send(results);
    }
  });
});

// Route pour récupérer une édition par son numéro
router.get('/:num', (req, res) => {
  const numEdition = req.params.num;
  const query = `
    SELECT *
    FROM edition
    WHERE num = ?
  `;
  connection.query(query, [numEdition], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la récupération de l\'édition :', error);
      res.status(500).send('Erreur lors de la récupération de l\'édition.');
    } else if (results.length === 0) {
      res.status(404).send('L\'édition demandée n\'existe pas.');
    } else {
      res.status(200).send(results[0]);
    }
  });
});
// Route pour récupérer le titre d'une édition
router.get('/:num/titre', (req, res) => {
    const num = req.params.num;
    const query = `
      SELECT titre
      FROM edition
      WHERE num = ?
    `;
    connection.query(query, [num], (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la récupération du titre :', error);
        res.status(500).send('Erreur lors de la récupération du titre.');
      } else if (results.length === 0) {
        res.status(404).send('Edition non trouvée.');
      } else {
        const titre = results[0].titre;
        res.status(200).send(titre);
      }
    });
  });

  // Route pour récupérer le texte d'une édition
router.get('/:num/texte', (req, res) => {
    const num = req.params.num;
    const query = `
      SELECT texte
      FROM edition
      WHERE num = ?
    `;
    connection.query(query, [num], (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la récupération du texte :', error);
        res.status(500).send('Erreur lors de la récupération du texte.');
      } else if (results.length === 0) {
        res.status(404).send('Edition non trouvée.');
      } else {
        const texte = results[0].texte;
        res.status(200).send(texte);
      }
    });
  });
  // Route pour récupérer le date début d'une édition
  router.get('/:num/dateD', (req, res) => {
    const num = req.params.num;
    const query = `
      SELECT dateD
      FROM edition
      WHERE num = ?
    `;
    connection.query(query, [num], (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la récupération de la date de début :', error);
        res.status(500).send('Erreur lors de la récupération de la date de début.');
      } else if (results.length === 0) {
        res.status(404).send('Edition non trouvée.');
      } else {
        const dateD = results[0].dateD.toString(); // Convertir la date en chaîne de caractères
        res.status(200).send(dateD);
      }
    });
  });
  
  // Route pour récupérer le date de fin d'une édition
  router.get('/:num/dateF', (req, res) => {
    const num = req.params.num;
    const query = `
      SELECT dateF
      FROM edition
      WHERE num = ?
    `;
    connection.query(query, [num], (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la récupération du date Fin :', error);
        res.status(500).send('Erreur lors de la récupération du date Fin.');
      } else if (results.length === 0) {
        res.status(404).send('Edition non trouvée.');
      } else {
        const dateF = results[0].dateF;
        res.status(200).send(dateF);
      }
    });
  });

  

module.exports = router;
