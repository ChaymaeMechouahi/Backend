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
           // Créer l'objet représentant les données de l'image
           const imageJSON = JSON.stringify(encodedImage);
           const image = {
            num_edition: 18, // Remplacez par le numéro d'édition approprié
            img: imageJSON
        };

        // Insérer l'image dans la base de données
        const sql = 'INSERT INTO image SET ?'; 

            connection.query(sql, image, (err, result) => {
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
