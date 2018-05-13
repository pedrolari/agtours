'use strict'

// Cargamos el modulo de mongoose
var mongoose = require('mongoose');

// Cargamos los Schemas de mongoose
var Schema = mongoose.Schema;

// Definimos el Schema de un documento de nuestra coleccion de usuarios
var TourSchema = Schema({
	nombre: String,
	descripcion: String,
	fechainicio: Date,
	fechafin: Date,
	diastour: Number,
	precio: Number,
	descuento: Number,
	image: String,
	user: { type: Schema.ObjectId, ref: 'User' }

});

// Exportamos el modulo
// En mongoose se guardaran en la coleccion Users en plural
module.exports = mongoose.model('Tour', TourSchema);