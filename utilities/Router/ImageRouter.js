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
    const imageUrl = 'https://marrakech-festival.com/wp-content/uploads/revslider/slider-2/fifm_19e.jpg';

    axios.get(imageUrl, { responseType: 'arraybuffer' })
        .then(response => {
            const imageBuffer = Buffer.from(response.data, 'binary');
            const encodedImage = imageBuffer.toString('base64');

            // Convertir l'image encodée en format JSON
            const image = { img: encodedImage };
            const imageJSON = JSON.stringify(image);

            // Insérer l'image JSON dans la base de données
            const sql = 'INSERT INTO image VALUES (18, ?);';//18 pour essayer  

            connection.query(sql, imageJSON, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Erreur lors de l\'insertion de l\'image dans la base de données.');
                    return;
                }

                res.send('Image insérée avec succès dans la base de données.');
            });
        })
        .catch(error => {
            console.error('Erreur lors du téléchargement de l\'image :', error);
            res.status(500).send('Erreur lors du téléchargement de l\'image.');
        })
        .finally(() => {
            connection.end(); // Fermer la connexion à la base de données
        });
});

module.exports = router;
