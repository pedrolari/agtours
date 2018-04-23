'use strict'

// Cargamos express mediante la variable express para crear las routes
var express = require('express');

// Cargo mi controlador y cargo el modulo 
var TourController = require('../controllers/tour');

// Usamos el route de express para poder crear las rutas
var api = express.Router();

// cargamos el middleware de autenticacion
var md_auth = require('../middlewares/authenticated');

// cargamos el middleware para subior ficheros
var multipart = require('connect-multiparty');

// cargamos el middleware de upload
var md_upload = multipart({ uploadDir: './uploads/tours' });

// Creamos nuestras rutas. Primer parametro la ruta y el segundo, el metodo del controlador que queramos usar
api.get('/pruebastours', md_auth.ensureAuth, TourController.pruebas);
api.post('/tour', md_auth.ensureAuth, TourController.saveTour);

// Exportamos el modulo
module.exports = api;