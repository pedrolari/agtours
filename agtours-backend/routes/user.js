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

// Cargamos la libreria de subir imagenes de connect-multiparty
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

// Creamos nuestras rutas. Primer parametro la ruta y el segundo, el metodo del controlador que queramos usar
api.get('/pruebas-del-controlador', [md_auth.ensureAuth, md_admin.isAdmin], UserController.pruebas);
api.post('/registro', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', [md_auth.ensureAuth], UserController.updateUser);
api.get('/usuarios', UserController.getUsers);
api.get('/usuarios/:id', UserController.getUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-file/:imageFile', UserController.getImageFile);


// Exportamos el modulo
module.exports = api;