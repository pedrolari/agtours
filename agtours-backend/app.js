//CONFIGURACION DEL SERVIDOR WEB

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

//cargamos el express
var app = express();


//Cargar rutas
var user_routes = require('./routes/user');

//Middlewares de body-parser
app.use(bodyParser.urlencoded({extended: false}));
// Convierte lo que llegue en el body a un JSON
app.use(bodyParser.json());


// Configurar Cabeceras y CORS


// Rutas BASE
// el primer parametro es para poner un prefijo, si no queremos prefijo ponemos /
app.use('/api', user_routes);


// Rutas body-parser

// app.get('/probando', (req, res) =>{
// 	res.status(200).send({message: 'Es una prueba de rutas'});
// });

// Exportamos el modulo
module.exports = app;