'use strict'

// Cargamos el modulo de mongoose
var mongoose = require('mongoose');

// Cargamos los Schemas de mongoose
var Schema = mongoose.Schema;

// Definimos el Schema de un documento de nuestra coleccion de usuarios
var TourSchema = Schema({
	nombre: String,
	descripcion: String,
	fecha_inicio: Date,
	fecha_fin: Date,
	dias_tour: Number,
	precio: Number,
	descuento: Number,
	categoria: String,
	ciudad: { type: Schema.ObjectId, ref: 'ciudad' }
});

// Exportamos el modulo
// En mongoose se guardaran en la coleccion Users en plural
module.exports = mongoose.model('Tour', TourSchema);