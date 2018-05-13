//CONFIGURACION DEL SERVIDOR WEB

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

//cargamos el express
var app = express();

//Cargar rutas
var user_routes = require('./routes/user');
var tour_routes = require('./routes/tour');
var hotel_routes = require('./routes/hotel');
var reservashotel_routes = require('./routes/reservahotel');
var reservastour_routes = require('./routes/reservatour');

//Middlewares de body-parser
app.use(bodyParser.urlencoded({extended: false}));

// Convierte lo que llegue en el body a un JSON
app.use(bodyParser.json());


// Configurar Cabeceras y CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// Rutas BASE
// el primer parametro es para poner un prefijo, si no queremos prefijo ponemos /
app.use('/api', user_routes);
app.use('/api', tour_routes);
app.use('/api', hotel_routes);
app.use('/api', reservashotel_routes);
app.use('/api', reservastour_routes);

// Rutas body-parser

// app.get('/probando', (req, res) =>{
// 	res.status(200).send({message: 'Es una prueba de rutas'});
// });

// Exportamos el modulo
module.exports = app;