'use strict'

// Cargamos el modulo de mongoose
var mongoose = require('mongoose');

// Cargamos los Schemas de mongoose
var Schema = mongoose.Schema;

// Definimos el Schema de un documento de nuestra coleccion de usuarios
var HotelSchema = Schema({
	nombre: String,
	descripcion: String,
	extras: String,
	categoria: String,
	preciosimple: Number,
	preciodoble: Number,
	descuento: Number,
	numhabitaciones: Number,
	ciudad: { type: Schema.ObjectId, ref: 'Ciudad' },
	image: String,
	user: { type: Schema.ObjectId, ref: 'User' }
	
});

// Exportamos el modulo
// En mongoose se guardaran en la coleccion Users en plural
module.exports = mongoose.model('Hotel', HotelSchema);