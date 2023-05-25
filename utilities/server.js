const express = require('express');
const mysql = require('mysql');
const editionRoutes = require('./Router/EditionRouter.js');
const participantRoutes = require('./Router/participantRouter.js');
const participationRoutes = require('./Router/participationRouter.js');
const imageRoutes = require('./Router/ImageRouter.js');
const cors = require('cors');
const app = express();



// Route pour récupérer toutes les éditions
app.use('/editions', editionRoutes);


// Route pour récupérer tous les participants
app.use('/participants', participantRoutes);


// Route pour récupérer tous les rôles des participants dans les éditions
app.use('/participations', participationRoutes);

// Route pour récupérer tous les images  des éditions
app.use('/images',imageRoutes);
app.get('/', (req, res) => {
  // Gérer la requête
  res.status(200).end('Bonjour, ceci est la route principale');
});
app.use(cors({
  origin: 'http://localhost:3005' // Remplacez par votre domaine autorisé
}));
// Démarrage du serveur
app.listen(3005, () => {
  console.log('Le serveur est en écoute sur le port 3005');
});
