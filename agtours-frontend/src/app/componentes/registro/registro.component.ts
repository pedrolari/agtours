import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from "../../modelos/usuario";
import { GLOBAL } from "../../servicios/global";
import { UsuariosService } from "../../servicios/usuarios.service";

import {ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuariosService]
})
export class RegistroComponent implements OnInit {

	public usuario: Usuario;
	public status: string;

	@ViewChild('closeBtn') closeBtn: ElementRef;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuariosService: UsuariosService
		) {
		this.usuario = new Usuario('', '', '', '', '', '', '', '', 'ROLE_USER', '');
	}

	ngOnInit() {
		// console.log('Componente registro cargado!!!!!');
	}

	onSubmit(){
		this._usuariosService.altaUsuario(this.usuario).subscribe(
			response => {
				if(response.user && response.user._id){
					this.status = 'success';
					this._router.navigate(['/usuarios']);
					this.usuario = new Usuario('', '', '', '', '', '', '', '', 'ROLE_USER', '');
					this.closeModal();
				} else {
					this.status = 'error';
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	//call this wherever you want to close modal
    private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }	
}
