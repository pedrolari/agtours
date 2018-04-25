import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from "../../modelos/usuario";
import { GLOBAL } from "../../servicios/global";
import { UsuariosService } from "../../servicios/usuarios.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuariosService]
})
export class RegistroComponent implements OnInit {

	public usuario: Usuario;
	public message: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuariosService: UsuariosService
		) {
		this.usuario = new Usuario('', '', '', '', '', '', '', '');
	}

	ngOnInit() {
		console.log('Componente registro cargado!!!!!');
	}

	guardarUsuario(){
		this._usuariosService.altaUsuario(this.usuario).subscribe(
			response => {
				if(response.usuario && response.usuario._id){
					this.message = 'El registro se ha realizado correctamente';
					this._router.navigate(['/usuarios']);
				} else {
					this.message = 'Error al registrarme';
				}

				this.usuario = new Usuario('', '', '', '', '', '', '', '');
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}
