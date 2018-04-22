'use strict'

// MODULOS internos de nodejs
	// Cargamos la libreria de bcrypt
	var bcrypt = require('bcrypt-nodejs');

// MODELOS
	//Cargamos el modelo user para crear nuevos usuarios
	var User = require('../models/user');

// SERVICIOS
	// Servicio JWT
	var jwt = require('../services/jwt.js');


// ACCIONES

	// Creamos la funcion o metodo
	// Todas las funciones tienen dos parametros principales: req = request y res = response
	function pruebas(req, res){
		res.status(200).send({
			message: 'Probando el controlador de usuarios y la accion pruebas', 
			user: req.user
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
			// user.rol = params.rol;
			// user.ciudad = params.ciudad;
			user.cp = params.cp;

			// Buscamos si hay ya un usuario con ese email

			User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
				if(err){
					res.status(500).send({ message: 'Error al comprobar el usuario' });
				}else{
					// si no ha encontrado ningun usuario es que se puede dar de alta
					if(!issetUser){
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
					}else{
						res.status(200).send({
							message: 'El usuario no puede registrarse por que ya existe ese email'
						});
					}
				}
			});

		} else {
			res.status(200).send({ message: 'Introduce los datos correctamente para poder registrar al usuario' });
		}

		// res.status(200).send({
		// 	message: 'Metodo de registro de usuarios'
		// });
	}

	// Login de Usuarios
	function login(req, res){
		var params = req.body;
		var email = params.email;
		var password = params.password;

		// buscamos en la coleccion Users un documento cuyo email sea igual que el que llega por post
		User.findOne({email: email.toLowerCase()}, (err, user) => {
			if(err){
				res.status(500).send({ message: 'Error al realizar el login' });
			}else{
				// si ha encontrado usuario es que se puede loguear
				if(user){
					//comprobamos si el password que recibimos es el mismo de la bbdd encriptado
					bcrypt.compare(password, user.password, (err, check)=>{
						if(check){
							//Comprobasmos y generamos el token
							if(params.gettoken){
								// devolvemos el token
								res.status(200).send({
									token: jwt.createToken(user)
								});

							} else {
								res.status(200).send({user});
							}
							
						} else {
							res.status(404).send({
								message: 'El usuario no ha podido loguearse correctamente'
							});
						}
					});
				}else{
					res.status(404).send({
						message: 'El usuario no ha podido loguearse'
					});
				}
			}
		});
	}

	// Actualizar Usuarios
	function updateUser(req, res){

		var userId = req.params.id;
		var update = req.body;

		// Si el id del usuario logueado es diferente a la id que me llega por URL
		// le decimos que no tiene permiso para actualizar al usuario
		if(userId != req.user.sub){
			return res.status(500).send({
				message: 'No tienes permiso para actualizar el usuario'
			});
		}

		// En el caso de que el userid sea el id del usuario logueado
		// Este metodo recibe el id del documento a actualizar, y un objeto con los datos a actualizar
		// Con { new:true } hacemos que directamente nos devuelva el json con el nuevo objeto modificado
		User.findByIdAndUpdate(userId, update, { new:true }, (err, userUpdated) => {
			if(err){
				res.status(500).send({
					message: 'Error al actualizar el usuario'
				});
			} else {
				if(!userUpdated){
					res.status(404).send({
						message: 'No se ha podido actualizar el usuario'
					});
				} else {
					// en caso de que sea correcto devolvemos el json con los datos
					res.status(200).send({
						user: userUpdated
					});
				}
			}
		});

		// res.status(200).send({
		// 	message: 'Actualizar Usuario'
		// });
	}

// Exportamos todos los metodos seguidos por comas, para poder utilizarlos fuera
// Esto devolvera un objeto con todos los metodos.
module.exports = {
	pruebas,
	saveUser,
	login,
	updateUser
}