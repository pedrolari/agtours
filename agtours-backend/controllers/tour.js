'use strict'

// MODULOS internos de nodejs
	// Cargamos la libreria de filesystem de nodejs
	var fs = require('fs');

	var path = require('path');

// MODELOS
	//Cargamos el modelo user para crear nuevos usuarios
	var User = require('../models/user');
	var Tour = require('../models/tour');

// SERVICIOS

// ACCIONES

	// Creamos la funcion o metodo de pruebas
	// Todas las funciones tienen dos parametros principales: req = request y res = response
	function pruebas(req, res){
		res.status(200).send({
			message: 'Probando el controlador de tours y el metodo pruebas', 
			user: req.user
		});
	}

	// Registro de Tour
	function saveTour(req, res){

		var tour = new Tour();

		var params = req.body;

		tour.nombre = params.nombre;
		tour.descripcion = params.descripcion;
		tour.fecha_inicio = params.fecha_inicio;
		tour.fecha_fin = params.fecha_fin;
		tour.dias_tour = params.dias_tour;
		tour.precio = params.precio;
		tour.descuento = params.descuento;
		tour.categoria = params.categoria;
		tour.ciudad = params.ciudad;	


		res.status(200).send({
			message: 'Metodo Grabar Tour'
		});
	}

// Exportamos todos los metodos seguidos por comas, para poder utilizarlos fuera
// Esto devolvera un objeto JSON con todos los metodos.
module.exports = {
	pruebas,
	saveTour
}