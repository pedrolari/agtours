'use strict'

// Uso de JWT
var jwt = require('jwt-simple');

// generar fechas, timestamps...
var moment = require('moment');

// creamos variable secreta para el token
var secret = 'clave_secreta_de_la_web_agtours';

exports.ensureAuth = function(req, res, next){
	// Comprobamos si llega la cabecera de autenticacion
	if(!req.headers.authorization){
		return res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticacion' });
	}

	// recogemos la cabecera de autenticacion
	// sustituimos las comillas simples y dobles que haya en el string que las sustituya por nada
	var token = req.headers.authorization.replace(/['"]+/g, '');

	try{
		// si es correcto tendremos el objeto completo
		var payload = jwt.decode(token, secret);

		// comprobamos si la fecha que tenemos en el token es menor o igual que la actual.
		// si es menor o igual (le habiamos sumado 30 dias cuando generabamos el token) le decimos que ha expirado
		if(payload.exp <= moment().unix()){
			return res.status(401).send({
				message: 'El token ha expirado.'
			});

		}
	} catch (ex){
		return res.status(404).send({
			message: 'El token no es valido'
		});
	}

	// una vez que tenemos el payload, tenemos el objeto guardado del usuario.
	// entonces seteamos una nueva propiedad dentro del request que va a ser user.
	// esta variable la podremos usar en todos nuestros controladores
	// asi podremos acceder al usuario logueado desde cualquier sitio
	req.user = payload;

	next();
}