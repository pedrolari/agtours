'use strict'

// Cargamos el modulo de mongoose
var mongoose = require('mongoose');

// Cargamos los Schemas de mongoose
var Schema = mongoose.Schema;

// Definimos el Schema de un documento de nuestra coleccion de usuarios
var UserSchema = Schema({
	nombre: String,
	apellidos: String,
	direccion: String,
	telefono: Number,
	email: String,
	password: String,
	rol: { type: Schema.ObjectId, ref: 'Rol' },
	ciudad: { type: Schema.ObjectId, ref: 'Ciudad' },
	cp: Number
});

// Exportamos el modulo
// En mongoose se guardaran en la coleccion Users en plural
module.exports = mongoose.model('User', UserSchema);