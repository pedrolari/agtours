'use strict'

// Cargamos express mediante la variable express para crear las routes
var express = require('express');

// Cargo mi controlador y cargo el modulo 
var ReservaHotelController = require('../controllers/reservahotel');

// Usamos el route de express para poder crear las rutas
var api = express.Router();

// cargamos el middleware de autenticacion
var md_auth = require('../middlewares/authenticated');

// Creamos nuestras rutas. Primer parametro la ruta y el segundo, el metodo del controlador que queramos usar
api.post('/hotel-reservas', md_auth.ensureAuth, ReservaHotelController.saveReservaHotel);
api.get('/hotel-reservas', ReservaHotelController.getReservasHotels);
api.get('/hotel-reservas-usuario/:id', ReservaHotelController.getReservasHotelsByUser);
api.get('/hotel-reservas/:id', ReservaHotelController.getReservaHotel);
api.put('/hotel-reservas/:id', md_auth.ensureAuth, ReservaHotelController.updatedReservaHotel);
api.delete('/hotel-reservas/:id', md_auth.ensureAuth, ReservaHotelController.deleteReservaHotel);
api.get('/get-image-hotel/:imageFile', ReservaHotelController.getImageFile);


// Exportamos el modulo
module.exports = api;