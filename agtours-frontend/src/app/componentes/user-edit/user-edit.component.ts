import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from "../../modelos/usuario";
import { GLOBAL } from "../../servicios/global";
import { UsuariosService } from "../../servicios/usuarios.service";
import { UploadService } from "../../servicios/upload.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UsuariosService, UploadService]
})
export class UserEditComponent implements OnInit {

	public usuario: Usuario;
	public identidad;
	public token;
	public status;
	public url: string;

	constructor( 
		private _usuariosService: UsuariosService,
		private _uploadService: UploadService
	) {
		//OBTENEMOS LA IDENTIDAD DEL USUARIO LOGUEADO Y EL TOKEN
		this.identidad = this._usuariosService.getIdentidad();
		this.token = this._usuariosService.getToken();
		//RELLENAMOS EL FORMULARIO CON LA IDENTIDAD DIRECTAMENTE
		this.usuario = this.identidad;
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log('app-user-edit cargado');
	}

	onSubmit(){
		this._usuariosService.updateUser(this.usuario).subscribe(
			response => {
				if(!response.user){
					this.status = 'error';
				} else {
					this.status = 'success';
					localStorage.setItem('identidad', JSON.stringify(this.usuario));
					
					//aqui se puede implementar la subida de la imagen
					this._uploadService.makeFileRequest(this.url + 'upload-image-user/' + this.usuario._id, [], this.filesToUpload, this.token, 'image')
										.then((result: any) => {
											this.usuario.image = result.image;
											localStorage.setItem('identidad', JSON.stringify(this.usuario));
										});
				}
			},
			error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.status = 'error';
				}
			}

		)
	}

	//Metodo para capturar los ficheros que incluimos en el input del formulario
	//propiedad de array de objetos tipo file
	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}
