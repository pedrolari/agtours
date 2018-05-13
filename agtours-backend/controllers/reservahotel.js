'use strict'

// MODULOS internos de nodejs
	// Cargamos la libreria de filesystem de nodejs
	var fs = require('fs');

	var path = require('path');

// MODELOS
	//Cargamos el modelo user para crear nuevos usuarios
	var User = require('../models/user');
	var Hotel = require('../models/hotel');
	var ReservaHotel = require('../models/reservahotel');

// SERVICIOS

// ACCIONES

	// Creamos la funcion o metodo de pruebas
	// Todas las funciones tienen dos parametros principales: req = request y res = response

	// Registro de Reserva de Hotel
	function saveReservaHotel(req, res){

		var reservahotel = new ReservaHotel();
		var params = req.body;

		
		if(params.hotel && params.fechaventa && params.fechaentrada && params.fechasalida && params.numhabitacionessimples && params.numhabitacionesdobles && params.numAdultos && params.numInfantiles && params.preciosimple && params.preciodoble && params.precio && params.descuento && params.preciototal){
			reservahotel.user = req.user.sub;
			reservahotel.hotel = params.hotel;
			reservahotel.fechaventa = params.fechaventa;
			reservahotel.fechaentrada = params.fechaentrada;
			reservahotel.fechasalida = params.fechasalida;
			reservahotel.numhabitacionessimples = params.numhabitacionessimples;
			reservahotel.numhabitacionesdobles = params.numhabitacionesdobles;
			reservahotel.numAdultos = params.numAdultos;
			reservahotel.numInfantiles = params.numInfantiles;
			reservahotel.preciosimple = params.preciosimple;
			reservahotel.preciodoble = params.preciodoble;
			reservahotel.precio = params.precio;
			reservahotel.descuento = params.descuento;
			reservahotel.preciototal = params.preciototal;

		console.log(reservahotel);
			reservahotel.save((err, reservahotelStored) => {
				if (err) {
					res.status(500).send({ message: 'Error en el servidor' });
				} else {
					if (!reservahotelStored) {
						res.status(404).send({ message: 'No se ha guardado la reserva del Hotel' });
					} else {
						res.status(200).send({ reservahotel: reservahotelStored });
					}
				}
			});
		} else {
			res.status(200).send({ message: 'Los datos son obligatorios' });
		}	
	}

	function getReservasHotels(req, res){
		ReservaHotel.find({}).populate({ path: 'user'}).populate({ path: 'hotel'}).exec((err, reservashotels) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!reservashotels){
					res.status(404).send({ message: 'No hay ninguna reserva' });
				} else {
					res.status(200).send({ reservashotels });
				}
			}
		});

	}

	function getReservaHotel(req, res){
		var reservahotelId = req.params.id;

		ReservaHotel.findById(reservahotelId).populate({ path: 'user'}).populate({ path: 'hotel'}).exec((err, reservahotel) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!reservahotel){
					res.status(404).send({ message: 'La reserva no existe' });
				} else {
					res.status(200).send({ reservahotel });
				}
			}
		});
	}

	function updatedReservaHotel(req, res){
		var reservahotelId = req.params.id;
		var update = req.body;

		ReservaHotel.findByIdAndUpdate(reservahotelId, update, { new:true }, (err, reservahotelUpdated) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!reservahotelUpdated){
					res.status(404).send({ message: 'La reserva no se ha actualizado' });
				} else {
					res.status(200).send({ tour: reservahotelUpdated });
				}
			}
		});
	}

	// funcion para borrar un tour
	function deleteReservaHotel(req, res){
		var reservahotelId = req.params.id;

		ReservaHotel.findByIdAndRemove(reservahotelId, (err, reservahotelRemoved) => {
			if(err){
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if (!reservahotelRemoved) {
					res.status(404).send({ message: 'No se ha borrado la reserva' });
				} else {
					res.status(200).send({ reservahotel: reservahotelRemoved });
				}
			}
		});
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

	function getReservasHotelsByUser(req, res){

		var reservahotelUserId = req.params.id;

		ReservaHotel.find({user: reservahotelUserId}).populate({ path: 'user' }).populate({ path: 'hotel' }).exec((err, reservashotels) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!reservashotels){
					res.status(404).send({ message: 'No hay ninguna reserva de hotel para este usuario' });
				} else {
					res.status(200).send({ reservashotels });
				}
			}
		});
	}	

// Exportamos todos los metodos seguidos por comas, para poder utilizarlos fuera
// Esto devolvera un objeto JSON con todos los metodos.
module.exports = {
	saveReservaHotel,
	getReservasHotels,
	getReservaHotel,
	updatedReservaHotel,
	deleteReservaHotel,
	getImageFile,
	getReservasHotelsByUser
}