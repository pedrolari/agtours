'use strict'

// Cargamos express mediante la variable express para crear las routes
var express = require('express');

// Cargo mi controlador y cargo el modulo 
var ReservaTourController = require('../controllers/reservatour');

// Usamos el route de express para poder crear las rutas
var api = express.Router();

// cargamos el middleware de autenticacion
var md_auth = require('../middlewares/authenticated');


// Creamos nuestras rutas. Primer parametro la ruta y el segundo, el metodo del controlador que queramos usar
api.post('/tour-reservas', md_auth.ensureAuth, ReservaTourController.saveReservaTour);
api.get('/tour-reservas', ReservaTourController.getReservasTours);
api.get('/tour-reservas-usuario/:id', ReservaTourController.getReservasToursByUser);
api.get('/tour-reservas/:id', ReservaTourController.getReservaTour);
api.put('/tour-reservas/:id', md_auth.ensureAuth, ReservaTourController.updatedReservaTour);
api.delete('/tour-reservas/:id', md_auth.ensureAuth, ReservaTourController.deleteReservaTour);
api.get('/get-image-tour/:imageFile', ReservaTourController.getImageFile);


// Exportamos el modulo
module.exports = api;