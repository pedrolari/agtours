import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuariosService } from "./usuarios.service";


@Injectable()
export class UserGuard implements CanActivate {

	constructor(
		private _router: Router,
		private _usuariosService: UsuariosService, 
	) {}

	canActivate(){
		let identidad = this._usuariosService.getIdentidad();

		// comprobamos el rol del usuario
		if(identidad && identidad.role == 'ROLE_USER'){
			return true;
		} else {
			this._router.navigate(['/inicio']);
			return false;

		}
	}

}