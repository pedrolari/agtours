'use strict'

// Cargamos el modulo de mongoose
var mongoose = require('mongoose');

// Cargamos los Schemas de mongoose
var Schema = mongoose.Schema;

// Definimos el Schema de un documento de nuestra coleccion de usuarios
var CiudadSchema = Schema({
	idCiudades: Number,
	Paises_Codigo: { type: Schema.ObjectId, ref: 'paises' }
	Ciudad: String
});

// Exportamos el modulo
// En mongoose se guardaran en la coleccion Users en plural
module.exports = mongoose.model('Ciudad', CiudadSchema);