import { Component,DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
import { Hotel } from "../../../modelos/hotel";
import { HotelService } from "../../../servicios/hotel.service";
import { UsuariosService } from "../../../servicios/usuarios.service";
import { UploadService } from "../../../servicios/upload.service";


@Component({
  selector: 'app-addhotel',
  templateUrl: './addhotel.component.html',
  providers: [UsuariosService, HotelService, UploadService]
})
export class AddhotelComponent implements OnInit {

	public title;
	public hotel: Hotel;
	public identidad;
	public token;
	public url: string;
	public status;

	constructor( 
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuariosService: UsuariosService,
		private _hotelService: HotelService,
		private _uploadService: UploadService		
	) {
		this.title = 'Alta de Hotel';
		this.hotel = new Hotel('', '', '', '', '', '', '', '', '', '');
		this.identidad = this._usuariosService.getIdentidad();
		this.token = this._usuariosService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log('Añadir hotel component ha sido cargado');
	}

	onSubmit(){
		this._hotelService.addHotel(this.token, this.hotel).subscribe(
			response => {
				if(!response.hotel){
					this.status = 'error';
				} else {
					this.status = 'success';
					this.hotel = response.hotel;
					
					// Subida de la imagen
					if (!this.filesToUpload) {
						this._router.navigate(['/admin-panel/listadohoteles']);
					} else {
						this._uploadService.makeFileRequest(this.url + 'upload-image-hotel/' + this.hotel._id, [], this.filesToUpload, this.token, 'image')
							.then((result: any) => {
								this.hotel.image = result.image;
								this._router.navigate(['/admin-panel/listadohoteles']);	
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
