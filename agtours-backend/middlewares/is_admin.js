'use strict'

exports.isAdmin = function(req, res, next){
	if(req.user.role != '5ada1ad2784df72b580fce57'){
		return res.status(200).send({ message: 'No tienes acceso a esta zona'})
	}

	next();
};