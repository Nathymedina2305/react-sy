// importo o express
const express = require('express');

// importando o arquivo ongcontroller
const Ongcontroller = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// crio o a variavel routes que eu desacoplo o modolo express
const routes = express.Router();

// o post é para criar uma sessao e n um login
routes.post('/sessions', SessionController.create);

// listagem de ongs
routes.get('/ongs', Ongcontroller.index);
routes.post('/ongs', Ongcontroller.create); 

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// com isso posso exportar uma variavel no node
module.exports = routes;

// rota para deletar
