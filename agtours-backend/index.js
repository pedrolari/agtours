'use strict'

// Creamos una variable para mongoose para cargar el modulo
var mongoose = require('mongoose');

// Creamos la variable app que es la que cargara el modulo app.js
var app = require('./app');

// Asignamos un puerto si tuvieramos variables globales y sino por defecto el 3789
var port = process.env.PORT || 3789;

// Con esta linea conseguimos quitar los warning de arranque
mongoose.Promise = global.Promise;

// En caso de que no desaparezcan los warnings añadiremos en un JSON {useMongoClient: true}, quedando la siguiente linea así:
// mongoose.connect('mongodb://localhost:27017/agtours', {useMongoClient: true})
// 	.then(() => {
// 		console.log('La conexion a la BBDD AGTOURS se ha realizado correctamente');
// 	})
// 	.catch(err => console.log(err));

// Conectamos a la BBDD
mongoose.connect('mongodb://localhost:27017/agtours', (err, res) => {
	if(err){
		throw err;
	} else {
		console.log('La conexion a la BBDD AGTOURS se ha realizado correctamente');
		// lanzamos el servidor
		app.listen(port, () => {
			console.log('El servidor local con Node y Express esta corriendo correctamente');
		});
	}
});