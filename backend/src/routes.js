const express = require('express');

const pessoaController = require('./controllers/pessoaController');
const produtoController = require('./controllers/produtoController');
const vendaController = require('./controllers/vendaController');
const servicoController = require('./controllers/servicoController');
const agendamentoController = require('./controllers/agendamentoController');
const loginController = require('./controllers/loginController');
const atendenteController = require('./controllers/atendenteController');


const routes = express.Router();

routes.get('/people', pessoaController.index);
routes.post('/people', pessoaController.create);
routes.post('/people/edit/:id_pes', pessoaController.edit);
routes.delete('/people/delete/:id_pes', pessoaController.delete);

routes.get('/login', loginController.index);
routes.post('/login', loginController.create);
routes.post('/login/edit/:id_login', loginController.edit);
routes.delete('/login/delete/:id_login', loginController.delete);

routes.get('/products', produtoController.index);
routes.post('/products', produtoController.create);
routes.post('/products/edit/:id_prod', produtoController.edit);
routes.delete('/products/delete/:id_prod', produtoController.delete);

routes.get('/sales', vendaController.index);
routes.post('/sales', vendaController.create);

routes.get('/services', servicoController.index);
routes.post('/services', servicoController.create);
routes.post('/services/edit/:id_serv', servicoController.edit);
routes.delete('/services/delete/:id_serv', servicoController.delete);

routes.get('/schedules', agendamentoController.index);
routes.post('/schedules', agendamentoController.create);
routes.delete('/schedules/delete/:id_agend', agendamentoController.delete);

routes.get('/attendant', atendenteController.index);
routes.post('/attendant', atendenteController.create);
routes.post('/attendant/edit/:id_atend', atendenteController.edit);
routes.delete('/attendant/delete/:id_atend', atendenteController.delete);

module.exports = routes;