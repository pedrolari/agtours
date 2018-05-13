'use strict'

// MODULOS internos de nodejs
	// Cargamos la libreria de filesystem de nodejs
	var fs = require('fs');

	var path = require('path');

// MODELOS
	//Cargamos el modelo user para crear nuevos usuarios
	var User = require('../models/user');
	var Hotel = require('../models/hotel');

// SERVICIOS

// ACCIONES

	// Creamos la funcion o metodo de pruebas
	// Todas las funciones tienen dos parametros principales: req = request y res = response
	function pruebasHotel(req, res){
		res.status(200).send({
			message: 'Probando el controlador de hoteles y el metodo pruebas', 
			user: req.user
		});
	}

	// Registro de Hotel
	function saveHotel(req, res){

		var hotel = new Hotel();
		var params = req.body;

		if(params.nombre && params.descripcion && params.categoria && params.preciosimple && params.preciodoble && params.descuento && params.numhabitaciones){
			hotel.nombre = params.nombre;
			hotel.descripcion = params.descripcion;
			hotel.extras = params.extras;
			hotel.categoria = params.categoria;
			hotel.preciosimple = params.preciosimple;
			hotel.preciodoble = params.preciodoble;
			hotel.descuento = params.descuento;
			hotel.numhabitaciones = params.numhabitaciones;
			hotel.ciudad = '5adb21d9784df745f8c65d04';
			hotel.image = null;
			hotel.user = req.user.sub;

			hotel.save((err, hotelStored) => {
				if (err) {
					res.status(500).send({ message: 'Error en el servidor' });
				} else {
					if (!hotelStored) {
						res.status(404).send({ message: 'No se ha guardado el Hotel' });
					} else {
						res.status(200).send({ hotel: hotelStored });
					}
				}
			});
		} else {
			res.status(200).send({ message: 'Los datos son obligatorios' });
		}	
	}

	function getHotels(req, res){
		Hotel.find({}).populate({ path: 'user'}).exec((err, hotels) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!hotels){
					res.status(404).send({ message: 'No hay ningun hotel' });
				} else {
					res.status(200).send({ hotels });
				}
			}
		});

	}

	function getHotel(req, res){
		var hotelId = req.params.id;

		Hotel.findById(hotelId).populate({ path: 'user'}).exec((err, hotel) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!hotel){
					res.status(404).send({ message: 'El hotel no existe' });
				} else {
					res.status(200).send({ hotel });
				}
			}
		});
	}

	function updatedHotel(req, res){
		var hotelId = req.params.id;
		var update = req.body;

		Hotel.findByIdAndUpdate(hotelId, update, { new:true }, (err, hotelUpdated) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!hotelUpdated){
					res.status(404).send({ message: 'El hotel no se ha actualizado' });
				} else {
					res.status(200).send({ hotel: hotelUpdated });
				}
			}
		});
	}

	// funcion para subir la imagen del hotel
	function uploadImage(req, res){
		var hotelId = req.params.id;
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
				Hotel.findByIdAndUpdate(hotelId, {image: file_name}, { new:true }, (err, hotelUpdated) => {
					if(err){
						res.status(500).send({
							message: 'Error al actualizar el hotel'
						});
					} else {
						if(!hotelUpdated){
							res.status(404).send({
								message: 'No se ha podido actualizar el hotel'
							});
						} else {
							// en caso de que sea correcto devolvemos el json con los datos
							res.status(200).send({ hotel: hotelUpdated, image: file_name });
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

	// funcion para subir la imagen del hotel
	function getImageFile(req, res){
		var imageFile = req.params.imageFile;
		var path_file = './uploads/hotels/'+imageFile;

		fs.exists(path_file, function(exists){
			if(exists){
				res.sendFile(path.resolve(path_file));
			} else {
				res.status(404).send({ message: 'La imagen no existe' });
			}
		});
	}

	// funcion para borrar un hotel
	function deleteHotel(req, res){
		var hotelId = req.params.id;

		Hotel.findByIdAndRemove(hotelId, (err, hotelRemoved) => {
			if(err){
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if (!hotelRemoved) {
					res.status(404).send({ message: 'No se ha borrado el hotel' });
				} else {
					res.status(200).send({ hotel: hotelRemoved });
				}
			}
		});
	}

// Exportamos todos los metodos seguidos por comas, para poder utilizarlos fuera
// Esto devolvera un objeto JSON con todos los metodos.
module.exports = {
	pruebasHotel,
	saveHotel,
	getHotels,
	getHotel,
	updatedHotel, 
	uploadImage,
	getImageFile,
	deleteHotel
}