import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from "../../servicios/usuarios.service";
import { Usuario } from "../../modelos/usuario";

import {ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuariosService]
})
export class LoginComponent implements OnInit {

	public usuario: Usuario;
	public identidad;
	public token;
	public status: string;

	@ViewChild('closeBtn') closeBtn: ElementRef;

	constructor(
  		private _route: ActivatedRoute,
		private _router: Router, 
		private _usuariosService: UsuariosService, 
	) {
		this.usuario = new Usuario('', '', '', '', '', '', '', '', 'ROLE_USER', '');
	}

	ngOnInit() {
		// console.log('Login.component cargado');
		// console.log(this._usuariosService.getIdentidad());
		// console.log(this._usuariosService.getToken());
	}

	onSubmit() {
		// loguear al usuario y conseguir el objeto
		this._usuariosService.signup(this.usuario).subscribe(
			response => {
				this.identidad = response.user;

				if(!this.identidad || !this.identidad._id){
					alert('El usuario no se ha logueado correctamente');
				} else {
					// this.identidad.password = '';

					// grabamos en localstorage la identidad para la persistencia
					localStorage.setItem('identidad', JSON.stringify(this.identidad));

					// Conseguir el token
					this._usuariosService.signup(this.usuario, 'true').subscribe(
						response => {
							this.token = response.token;

							if(this.token.length <= 0){
								alert('El token no se ha generado');
							} else {
								
								// grabamos en localstorage el token para la persistencia
								localStorage.setItem('token', this.token);
								this.status = 'success';
								this._router.navigate(['/inicio']);
								// setTimeout((_router: Router) => { this._router.navigate(['/inicio']);}, 2000);
								// $timeout(function () { modalInstance.close('closing');}, 2000);
								this.closeModal();
							}
						},
						error => {
							console.log(<any>error);
						}

					);
				}
			},
			error => {
				var errorMessage = <any>error;

				if(errorMessage != null){
					var body = JSON.parse(error._body);
					this.status = 'error';
				}
			}

		);
	}

	//call this wherever you want to close modal
    private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }
}
