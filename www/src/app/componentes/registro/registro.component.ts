import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from "../../servicios/usuarios.service";
import { Usuario } from "../../modelos/usuario";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuariosService]
})
export class RegistroComponent implements OnInit {

	public usuario: Usuario;

	constructor(
		private usuariosService: UsuariosService,
		private router: Router) {
		this.usuario = new Usuario('', '', '', '', '', '', '', '');
	}

  ngOnInit() {
  }

	guardarUsuario(){
		console.log(this.usuario);
		this.usuariosService.altaUsuario(this.usuario).subscribe(
			response => {
				if (response.code == 200) {
					this.router.navigate(['/productos']);
				} else {
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
