'use strict'

// Cargamos el modulo de mongoose
var mongoose = require('mongoose');

// Cargamos los Schemas de mongoose
var Schema = mongoose.Schema;

// Definimos el Schema de un documento de nuestra coleccion de usuarios
var ReservaTourSchema = Schema({
	tour: { type: Schema.ObjectId, ref: 'Tour' },
	user: { type: Schema.ObjectId, ref: 'User' },
	fechaVenta: Date,
	fechainicio: Date,
	fechafin: Date,
	numAdultos: Number,
	numInfantiles: Number,
	precio: Number,
	descuento: Number,
	preciototal: Number
});

// Exportamos el modulo
// En mongoose se guardaran en la coleccion Users en plural
module.exports = mongoose.model('ReservaTour', ReservaTourSchema);