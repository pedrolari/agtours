'use strict'

// Cargamos express mediante la variable express para crear las routes
var express = require('express');

// Cargo mi controlador y cargo el modulo 
var UserController = require('../controllers/user');

// Usamos el route de express para poder crear las rutas
var api = express.Router();

// Creamos nuestras rutas. Primer parametro la ruta y el segundo, el metodo del controlador que queramos usar
api.get('/pruebas-del-controlador', UserController.pruebas);
api.post('/registro', UserController.saveUser);
api.post('/login', UserController.login);

// Exportamos el modulo
module.exports = api;