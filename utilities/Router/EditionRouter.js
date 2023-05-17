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
      res.send(results);
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
      res.send(results[0]);
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
        res.send(titre);
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
        res.send(texte);
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
        console.error('Erreur lors de la récupération du date Début :', error);
        res.status(500).send('Erreur lors de la récupération du date Début.');
      } else if (results.length === 0) {
        res.status(404).send('Edition non trouvée.');
      } else {
        const dateD = results[0].dateD;
        res.send(dateD);
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
        res.send(dateF);
      }
    });
  });
// Route pour récupérer une image d'édition
router.get('/:num/image', (req, res) => {
  const num = req.params.num;
  const query = `
    SELECT image
    FROM edition
    WHERE num = ?
  `;
  connection.query(query, [num], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la récupération de l\'URL de l\'image :', error);
      res.status(500).send('Erreur lors de la récupération de l\'URL de l\'image.');
    } else if (results.length === 0) {
      res.status(404).send('Edition non trouvée.');
    } else {
      const imageUrl = results[0].image_url;

      // Utiliser axios pour récupérer l'image depuis l'URL
      axios.get(imageUrl, { responseType: 'arraybuffer' })
        .then(response => {
          // Convertir l'image en base64
          const imageData = Buffer.from(response.data, 'binary').toString('base64');
          const jsonImage = { image: imageData };
          res.json(jsonImage);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de l\'image :', error);
          res.status(500).send('Erreur lors de la récupération de l\'image.');
        });
    }
  });
});
  

module.exports = router;
