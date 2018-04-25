'use strict'

// Cargamos express mediante la variable express para crear las routes
var express = require('express');

// Cargo mi controlador y cargo el modulo 
var UserController = require('../controllers/user');

// Usamos el route de express para poder crear las rutas
var api = express.Router();

// cargamos el middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

// Creamos nuestras rutas. Primer parametro la ruta y el segundo, el metodo del controlador que queramos usar
api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/registro', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserController.updateUser);
api.get('/usuarios', UserController.getUsers);
api.get('/usuarios/:id', UserController.getUser);


// Exportamos el modulo
module.exports = api;