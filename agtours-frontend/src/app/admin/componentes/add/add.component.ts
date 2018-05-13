import { Component,DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
import { Tour } from "../../../modelos/tour";
import { TourService } from "../../../servicios/tour.service";
import { UsuariosService } from "../../../servicios/usuarios.service";
import { UploadService } from "../../../servicios/upload.service";

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	providers: [UsuariosService, TourService,UploadService]
})
export class AddComponent implements OnInit {

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
		this.title = 'Alta de Tour';
		this.tour = new Tour('', '', '', '', '', '', '', '', '');
		this.identidad = this._usuariosService.getIdentidad();
		this.token = this._usuariosService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log('Añadir tour component ha sido cargado');
	}

	onSubmit(){
		this._tourService.addTour(this.token, this.tour).subscribe(
			response => {
				if(!response.tour){
					this.status = 'error';
				} else {
					this.status = 'success';
					this.tour = response.tour;
					
					// Subida de la imagen
					if (!this.filesToUpload) {
						this._router.navigate(['/admin-panel/listado']);
					} else {
						this._uploadService.makeFileRequest(this.url + 'upload-image-tour/' + this.tour._id, [], this.filesToUpload, this.token, 'image')
							.then((result: any) => {
								this.tour.image = result.image;
								this._router.navigate(['/admin-panel/listado']);	
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
}
