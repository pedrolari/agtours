'use strict'

// Uso de JWT
var jwt = require('jwt-simple');

// generar fechas, timestamps...
var moment = require('moment');

// creamos variable secreta para el token
var secret = 'clave_secreta_de_la_web_agtours';

exports.createToken= function(user){
	// creamos payload. Objeto para que JWT pueda trabajar con el token
	var payload = {
		sub: user._id,
		nombre: user.nombre,
		apellidos: user.apellidos,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	// pasamos el token y la clave secreta para encriptarlo
	return jwt.encode(payload, secret)
};