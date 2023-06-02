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

// Route pour récupérer toutes les participations
router.get('/', (req, res) => {
  const query = `
    SELECT *
    FROM participation
  `;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la récupération des participations :', error);
      res.status(500).send('Erreur lors de la récupération des participations.');
    } else {
      res.send(results);
    }
  });
});
// Route pour récupérer toutes les participations dans une édition 
router.get('/:num_edition', (req, res) => {
        const num_edition = req.params.num_edition;

    const query = `
      SELECT *
      FROM participation
      WHERE num_edition = ?
    `;
    connection.query(query, [num_edition],(error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la récupération des participations :', error);
        res.status(500).send('Erreur lors de la récupération des participations.');
      } else {
        res.send(results);
      }
    });
  });

  // Route pour récupérer toutes les roles d'un participant  dans une édition
router.get('/:id_participant/:num_edition/role', (req, res) => {
    const id_participant = req.params.id_participant;
    const num_edition = req.params.num_edition;

const query = `
  SELECT role
  FROM participation
  WHERE id_participant = ?  AND num_edition = ?
`;
connection.query(query,[id_participant, num_edition], (error, results, fields) => {
  if (error) {
    console.error('Erreur lors de la récupération des participations :', error);
    res.status(500).send('Erreur lors de la récupération des participations.');
  } else {
    res.send(results);
  }
});
});
  // Route pour récupérer toutes le prix d'un participant  dans une édition
  router.get('/:id_participant/:num_edition/prix', (req, res) => {
    const id_participant = req.params.id_participant;
    const num_edition = req.params.num_edition;

const query = `
  SELECT prix
  FROM participation
  WHERE id_participant = ?  AND num_edition = ?
`;
connection.query(query,[id_participant, num_edition], (error, results, fields) => {
  if (error) {
    console.error('Erreur lors de la récupération des participations :', error);
    res.status(500).send('Erreur lors de la récupération des participations.');
  } else {
    res.send(results);
  }
});
});
  // Route pour récupérer toutes le prix d'un participant  dans une édition
  router.get('/:id_participant/:num_edition/film', (req, res) => {
    const id_participant = req.params.id_participant;
    const num_edition = req.params.num_edition;

const query = `
  SELECT film
  FROM participation
  WHERE id_participant = ?  AND num_edition = ?
`;
connection.query(query,[id_participant, num_edition], (error, results, fields) => {
  if (error) {
    console.error('Erreur lors de la récupération des participations :', error);
    res.status(500).send('Erreur lors de la récupération des participations.');
  } else {
    res.send(results);
  }
});
});
 

// Route pour récupérer les données de  participations d'une édition donnée pour un participant 
router.get('/:id_participant/:num_edition', (req, res) => {
    const sql = 'SELECT * FROM participation WHERE id_participant = ? AND num_edition = ?';
    const id_participant = req.params.id_participant;
    const num_edition = req.params.num_edition;
  
    connection.query(sql, [id_participant, num_edition], (err, result) => {
      if (err) throw err;
  
      res.send(result);
    });
  });
 

module.exports = router;
