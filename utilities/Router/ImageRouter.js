const express = require('express');
const axios = require('axios');
const mysql = require('mysql');

const router = express.Router();
// Connexion à la base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'stageProject'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});


// Route GET pour stocker l'image dans la base de données
router.get('/', (req, res) => {
  const sqlQuery = 'SELECT img FROM image';

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des images :', err);
      res.sendStatus(500);
    } else {
      if (results.length === 0) {
        res.sendStatus(404);
      } else {
        const imageList = results.map((result) => {
          const imageData = result.img;
          const base64Image = Buffer.from(imageData).toString('base64');
          return { img: base64Image };
        });

        res.json(imageList);
      }
    }
  });
});
router.get('/:num/:id', (req, res) => {
    const imageId = req.params.id;
    const num = req.params.num;
    const sqlQuery = 'SELECT img FROM image WHERE id = ? AND num_edition = ?';
  
    connection.query(sqlQuery, [imageId, num], (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération de l\'image :', err);
        res.sendStatus(500);
      } else {
        if (results.length === 0) {
          res.sendStatus(404);
        } else {
          const imageData = results[0].img;
          const base64Image = Buffer.from(imageData).toString('base64');
          const imageJSON = { img: base64Image };
          res.json(imageJSON);
        }
      }
    });
  });
  router.get('/:num', (req, res) => {
    const num = req.params.num;
    const sqlQuery = 'SELECT img FROM image WHERE num_edition = ?';
    
    connection.query(sqlQuery, [num], (err, results) => {
    if (err) {
    console.error('Erreur lors de la récupération des images :', err);
    res.sendStatus(500);
    } else {
    if (results.length === 0) {
    res.sendStatus(404);
    } else {
    const imageList = results.map((row) => {
    const imageData = row.img;
    const base64Image = Buffer.from(imageData).toString('base64');
    return { num_edition: row.num_edition, img: base64Image };
    });
    res.json(imageList);
    }
    }
    });
    });
  
module.exports = router;
