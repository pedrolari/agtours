import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from "../../modelos/usuario";

// import { Observable } from 'rxjs/Rx';
import { UsuariosService } from "../../servicios/usuarios.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

	public usuario: Usuario;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuariosService: UsuariosService
		) {
		this.usuario = new Usuario('', '', '', '', '', '', '', '');
	}

  ngOnInit() {
  }

  // guardarUsuario(usuario: Usuario) {
  // 	console.log(this.usuario);
  //   this._usuariosService.altaUsuario(this.usuario).subscribe(
  //      data => {
  //        // refresh the list
  //        this.router.navigate(['/usuarios']);
  //        return true;
  //      },
  //      error => {
         // console.error("Error saving food!");
  //        return Observable.throw(error);
  //      }
  //   );
  // }
	guardarUsuario(){
		console.log(this.usuario);
		this._usuariosService.altaUsuario(this.usuario).subscribe(
			response => {
				// if (response.code == 200) {
					this._router.navigate(['/usuarios']);
				// } else {
					console.log(response);
				// }
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
