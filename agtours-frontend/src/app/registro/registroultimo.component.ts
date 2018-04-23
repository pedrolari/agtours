import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from "../modelos/usuario";
import { UsuariosService } from "../servicios/usuarios.service";


@Component({
  selector: 'app-registroultimo',
  templateUrl: './registroultimo.component.html',
})
export class RegistroUltimoComponent implements OnInit {

	public usuario: Usuario;



	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    private _usuariosService: UsuariosService
		) {
		this.usuario = new Usuario("","","", "", "", "", "", "");
	}

  ngOnInit() {
  	console.log('registro componente cargado correctamente');
  }

  // guardarUsuario(usuario: Usuario) {
  // 	console.log(this.usuario);

  // }
  // guardarUsuario(){
  //   console.log(this.usuario);
  //   this._usuariosService.altaUsuario(this.usuario).subscribe(
  //     response => {
  //       // if (response.code == 200) {
  //         this._router.navigate(['/usuarios']);
  //       // } else {
  //         console.log(response);
  //       // }
  //     },
  //     error => {
  //       console.log(<any>error);
  //     }
  //   );
  // }
}

