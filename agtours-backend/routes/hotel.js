'use strict'

// Cargamos express mediante la variable express para crear las routes
var express = require('express');

// Cargo mi controlador y cargo el modulo 
var HotelController = require('../controllers/hotel');

// Usamos el route de express para poder crear las rutas
var api = express.Router();

// cargamos el middleware de autenticacion
var md_auth = require('../middlewares/authenticated');

// cargamos el middleware para subior ficheros
var multipart = require('connect-multiparty');

// cargamos el middleware de upload
var md_upload = multipart({ uploadDir: './uploads/hotels' });

// Creamos nuestras rutas. Primer parametro la ruta y el segundo, el metodo del controlador que queramos usar
api.get('/pruebas-hotel', md_auth.ensureAuth, HotelController.pruebasHotel);
api.post('/hotel', md_auth.ensureAuth, HotelController.saveHotel);
api.get('/hotels', HotelController.getHotels);
api.get('/hotel/:id', HotelController.getHotel);
api.put('/hotel/:id', md_auth.ensureAuth, HotelController.updatedHotel);
api.post('/upload-image-hotel/:id', [md_auth.ensureAuth, md_upload], HotelController.uploadImage);
api.get('/get-image-hotel/:imageFile', HotelController.getImageFile);
api.delete('/hotel/:id', md_auth.ensureAuth, HotelController.deleteHotel);


// Exportamos el modulo
module.exports = api;