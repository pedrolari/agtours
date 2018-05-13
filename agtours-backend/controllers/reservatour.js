'use strict'

// MODULOS internos de nodejs
	// Cargamos la libreria de filesystem de nodejs
	var fs = require('fs');

	var path = require('path');

// MODELOS
	//Cargamos el modelo user para crear nuevos usuarios
	var User = require('../models/user');
	var Tour = require('../models/tour');
	var ReservaTour = require('../models/reservatour');

// SERVICIOS

// ACCIONES

	// Creamos la funcion o metodo de pruebas
	// Todas las funciones tienen dos parametros principales: req = request y res = response

	// Registro de Reserva de Tour
	function saveReservaTour(req, res){

		var reservatour = new ReservaTour();
		var params = req.body;

		if(params.tour && params.fechaVenta && params.fechainicio && params.fechafin && params.numAdultos && params.numInfantiles && params.precio && params.descuento && params.preciototal){
			reservatour.tour = params.tour;
			reservatour.user = req.user.sub;
			reservatour.fechaVenta = params.fechaVenta;
			reservatour.fechainicio = params.fechainicio;
			reservatour.fechafin = params.fechafin;
			reservatour.numAdultos = params.numAdultos;
			reservatour.numInfantiles = params.numInfantiles;
			reservatour.precio = params.precio;
			reservatour.descuento = params.descuento;
			reservatour.preciototal = params.preciototal;

			reservatour.save((err, reservatourStored) => {
				if (err) {
					res.status(500).send({ message: 'Error en el servidor' });
				} else {
					if (!reservatourStored) {
						res.status(404).send({ message: 'No se ha guardado la Reserva del Tour' });
					} else {
						console.log(reservatourStored);
						res.status(200).send({ reservatour: reservatourStored });
					}
				}
			});
		} else {
			res.status(200).send({ message: 'Los datos son obligatorios' });
		}	
	}

	function getReservasTours(req, res){
		ReservaTour.find({}).populate({ path: 'user' }).populate({ path: 'tour' }).exec((err, reservastours) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!reservastours){
					res.status(404).send({ message: 'No hay ninguna reserva de tour' });
				} else {
					res.status(200).send({ reservastours });
				}
			}
		});

	}

	function getReservaTour(req, res){
		var reservatourId = req.params.id;

		ReservaTour.findById(reservatourId).populate({ path: 'user'}).populate({ path: 'tour' }).exec((err, reservatour) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!reservatour){
					res.status(404).send({ message: 'La reserva de tour no existe' });
				} else {
					res.status(200).send({ reservatour });
				}
			}
		});
	}

	function updatedReservaTour(req, res){
		var reservatourId = req.params.id;
		var update = req.body;

		ReservaTour.findByIdAndUpdate(reservatourId, update, { new:true }, (err, reservatourUpdated) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!reservatourUpdated){
					res.status(404).send({ message: 'El tour no se ha actualizado' });
				} else {
					res.status(200).send({ reservatour: reservatourUpdated });
				}
			}
		});
	}


	// funcion para borrar una reserva tour
	function deleteReservaTour(req, res){
		var reservatourId = req.params.id;

		ReservaTour.findByIdAndRemove(reservatourId, (err, reservatourRemoved) => {
			if(err){
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if (!reservatourRemoved) {
					res.status(404).send({ message: 'No se ha borrado el tour' });
				} else {
					res.status(200).send({ reservatour: reservatourRemoved });
				}
			}
		});
	}

	// funcion para obtener la imagen del tour
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

	function getReservasToursByUser(req, res){

		var reservatourUserId = req.params.id;

		ReservaTour.find({user: reservatourUserId}).populate({ path: 'user' }).populate({ path: 'tour' }).exec((err, reservastours) => {
			if (err) {
				res.status(500).send({ message: 'Error en la peticion' });
			} else {
				if(!reservastours){
					res.status(404).send({ message: 'No hay ninguna reserva de tour para este usuario' });
				} else {
					res.status(200).send({ reservastours });
				}
			}
		});
	}	

// Exportamos todos los metodos seguidos por comas, para poder utilizarlos fuera
// Esto devolvera un objeto JSON con todos los metodos.
module.exports = {
	saveReservaTour,
	getReservasTours,
	getReservaTour,
	updatedReservaTour,
	deleteReservaTour,
	getImageFile,
	getReservasToursByUser
}