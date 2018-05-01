import { Component,DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
import { Tour } from "../../../modelos/tour";
import { TourService } from "../../../servicios/tour.service";
import { UsuariosService } from "../../../servicios/usuarios.service";
import { UploadService } from "../../../servicios/upload.service";

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	providers: [UsuariosService, TourService, UploadService]
})
export class EditComponent implements OnInit {
	public title;
	public tour: Tour;
	public identidad;
	public token;
	public url: string;
	public status;
	
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuariosService: UsuariosService,
		private _tourService: TourService,
		private _uploadService: UploadService
	) {
		this.title = 'Editar Tour';
		this.tour = new Tour('', '', '', '', '', '', '', '', '');
		this.identidad = this._usuariosService.getIdentidad();
		this.token = this._usuariosService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.getTour();
	}

	onSubmit(){
		var id = this.tour._id;

		this._tourService.editTour(this.token, id, this.tour).subscribe(
			response => {
				if(!response.tour){
					this.status = 'error';
				} else {
					this.status = 'success';
					this.tour = response.tour;
					
					// Subida de la imagen
					if (!this.filesToUpload) {
						this._router.navigate(['/admin-panel/tour', this.tour._id]);
					} else {
						this._uploadService.makeFileRequest(this.url + 'upload-image-tour/' + this.tour._id, [], this.filesToUpload, this.token, 'image')
							.then((result: any) => {
								this.tour.image = result.image;
								this._router.navigate(['/admin-panel/tour', this.tour._id]);
						});
					}
				}
			},
			error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
	}

	public filesToUpload: Array<File>;
	
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	getTour(){
		// Con el foreach recorremos la url y obtenemos un array con los parametros
		// definimos la variable id para obtener de params['id'] la id del tour
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._tourService.getTour(id).subscribe(
				response => {
					if (!response.tour) {
						this._router.navigate(['/inicio']);
					} else {
						this.tour = response.tour;
					}
				},
				error => {
					this._router.navigate(['/inicio']);
					console.log(<any>error);
				}
			);
		});
	}
}
