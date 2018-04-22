'use strict'

// MODULOS internos de nodejs
	// Cargamos la libreria de bcrypt
	var bcrypt = require('bcrypt-nodejs');


// MODELOS
	//Cargamos el modelo user para crear nuevos usuarios
	var User = require('../models/user');

// ACCIONES

	// Creamos la funcion o metodo
	// Todas las funciones tienen dos parametros principales: req = request y res = response
	function pruebas(req, res){
		res.status(200).send({
			message: 'Probando el controlador de usuarios y la accion pruebas'
		});
	}

	// Registro de Usuarios
	function saveUser(req, res){
		
		// creamos el objeto del usuario
		var user = new User();

		//recogemos los parametros del body que nos llegan de la peticion
		var params = req.body;

		console.log(params);
		//asignamos valores al objeto usuario si llegan los datos completos
		if(params.password && params.nombre && params.apellidos && params.direccion && params.telefono && params.email && params.cp){
			user.nombre = params.nombre;
			user.apellidos = params.apellidos;
			user.direccion = params.direccion;
			user.telefono = params.telefono;
			user.email = params.email;
			user.rol = params.rol;
			// user.ciudad = params.ciudad;
			user.cp = params.cp;
			//encriptamos la contraseña
			bcrypt.hash(params.password, null, null, function(err, hash){
				user.password = hash;

				//guardamos el usuario en bbdd
				user.save((err, userStored) => {
					console.log(err);
					if(err){
						res.status(500).send({ message: 'Error al guardar el usuario' });
					} else {
						if(!userStored){
							res.status(404).send({ message: 'No se ha registrado el usuario' });
						} else {
							res.status(200).send({ user: userStored });
						}
					}

				});

			});
		} else {
			res.status(200).send({ message: 'Introduce los datos correctamente para poder registrar al usuario' });
		}

		// res.status(200).send({
		// 	message: 'Metodo de registro de usuarios'
		// });
	}

// Exportamos todos los metodos seguidos por comas, para poder utilizarlos fuera
// Esto devolvera un objeto con todos los metodos.
module.exports = {
	pruebas,
	saveUser
}