const express = require('express');
const mysql = require('mysql');
const editionRoutes = require('./Router/EditionRouter.js');
const participantRoutes = require('./Router/participantRouter.js');
const participationRoutes = require('./Router/participationRouter.js');
const imageRoutes = require('./Router/ImageRouter.js');

const app = express();



// Route pour récupérer toutes les éditions
app.use('/editions', editionRoutes);


// Route pour récupérer tous les participants
app.use('/participants', participantRoutes);


// Route pour récupérer tous les rôles des participants dans les éditions
app.use('/participations', participationRoutes);

// Route pour récupérer tous les images  des éditions
app.use('/images',imageRoutes);

// Démarrage du serveur
app.listen(3005, () => {
  console.log('Le serveur est en écoute sur le port 3005');
});
