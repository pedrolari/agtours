'use strict'

// Cargamos el modulo de mongoose
var mongoose = require('mongoose');

// Cargamos los Schemas de mongoose
var Schema = mongoose.Schema;

// Definimos el Schema de un documento de nuestra coleccion de usuarios
var ReservaHotelSchema = Schema({
	user: { type: Schema.ObjectId, ref: 'User' },
	hotel: { type: Schema.ObjectId, ref: 'Hotel' },
	fechaventa: Date,
	fechaentrada: Date,
	fechasalida: Date,
	numhabitacionessimples: Number,
	numhabitacionesdobles: Number,
	numAdultos: Number,
	numInfantiles: Number,
	preciosimple: Number,
	preciodoble: Number,
	precio: Number,
	descuento: Number,
	preciototal: Number
});

// Exportamos el modulo
// En mongoose se guardaran en la coleccion Users en plural
module.exports = mongoose.model('ReservaHotel', ReservaHotelSchema);