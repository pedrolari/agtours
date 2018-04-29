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

		if(params.nombre && params.descripcion && params.fechainicio && params.fechafin && params.diastour && params.precio && params.descuento){
			tour.nombre = params.nombre;
			tour.descripcion = params.descripcion;
			tour.fechainicio = params.fechainicio;
			tour.fechafin = params.fechafin;
			tour.diastour = params.diastour;
			tour.precio = params.precio;
			tour.descuento = params.descuento;
			tour.image = null;
			tour.user = req.user.sub;

			tour.save((err, tourStored) => {
				if (err) {
					res.status(500).send({ message: 'Error en el servidor' });
				} else {
					if (!tourStored) {
						res.status(404).send({ message: 'No se ha guardado el TOUR' });
					} else {
						res.status(200).send({ tour: tourStored });
					}
				}
			});
		} else {
			res.status(200).send({ message: 'Los datos son obligatorios' });
		}	
	}

	function getTours(req, res){
		Tour.find({}).populate({ path: 'user'}).exec((err, tours) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!tours){
					res.status(404).send({ message: 'No hay ningun tour' });
				} else {
					res.status(200).send({ tours });
				}
			}
		});

	}

	function getTour(req, res){
		var tourId = req.params.id;

		Tour.findById(tourId).populate({ path: 'user'}).exec((err, tour) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!tour){
					res.status(404).send({ message: 'El tour no existe' });
				} else {
					res.status(200).send({ tour });
				}
			}
		});
	}

	function updatedTour(req, res){
		var tourId = req.params.id;
		var update = req.body;

		Tour.findByIdAndUpdate(tourId, update, { new:true }, (err, tourUpdated) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!tourUpdated){
					res.status(404).send({ message: 'El tour no se ha actualizado' });
				} else {
					res.status(200).send({ tour: tourUpdated });
				}
			}
		});
	}

// funcion para subir la imagen del tour
	function uploadImage(req, res){
		var tourId = req.params.id;
		var file_name = 'No Subido...';

		if(req.files){
			var file_path = req.files.image.path;
			var file_split = file_path.split('\\');
			var file_name = file_split[2];

			// sacamos la extension del fichero
			var ext_split = file_name.split('\.');
			var file_ext = ext_split[1];

			if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' ||file_ext == 'gif'){
				
				// En el caso de que el userid sea el id del usuario logueado
				// Este metodo recibe el id del documento a actualizar, y un objeto con los datos a actualizar
				// Con { new:true } hacemos que directamente nos devuelva el json con el nuevo objeto modificado
				Tour.findByIdAndUpdate(tourId, {image: file_name}, { new:true }, (err, tourUpdated) => {
					if(err){
						res.status(500).send({
							message: 'Error al actualizar el tour'
						});
					} else {
						if(!tourUpdated){
							res.status(404).send({
								message: 'No se ha podido actualizar el tour'
							});
						} else {
							// en caso de que sea correcto devolvemos el json con los datos
							res.status(200).send({ tour: tourUpdated, image: file_name });
						}
					}
				});				
			} else {
				fs.unlink(file_path, (err) => {
					if(err){
						res.status(200).send({ message: 'Extension no valida y fichero no borrado' });
					} else {
						res.status(200).send({ message: 'Extension no valida' });
					}
				});
			}

		} else {
			res.status(200).send({ message: 'No se han subido ficheros'	});
		}
	}

	// funcion para subir la imagen del tour
	function getImageFile(req, res){
		var imageFile = req.params.imageFile;
		var path_file = './uploads/tours/'+imageFile;

		fs.exists(path_file, function(exists){
			if(exists){
				res.sendFile(path.resolve(path_file));
			} else {
				res.status(404).send({ message: 'La imagen no existe' });
			}
		});
	}

	// funcion para borrar un tour
	function deleteTour(req, res){
		var tourId = req.params.id;

		Tour.findByIdAndRemove(tourId, (err, tourRemoved) => {
			if(err){
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if (!tourRemoved) {
					res.status(404).send({ message: 'No se ha borrado el tour' });
				} else {
					res.status(200).send({ tour: tourRemoved });
				}
			}
		});
	}

// Exportamos todos los metodos seguidos por comas, para poder utilizarlos fuera
// Esto devolvera un objeto JSON con todos los metodos.
module.exports = {
	pruebas,
	saveTour,
	getTours,
	getTour,
	updatedTour, 
	uploadImage,
	getImageFile,
	deleteTour
}