import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
import { Tour } from "../../../modelos/tour";
import { TourService } from "../../../servicios/tour.service";
import { UsuariosService } from "../../../servicios/usuarios.service";
import { UploadService } from "../../../servicios/upload.service";


@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	providers: [TourService, UsuariosService]
})
export class ListComponent implements OnInit {

	public title: string;
	public tours: Tour[];
	public token;
	public busqueda;
	
	constructor( 
		private _route: ActivatedRoute,
		private _router: Router,
		private _tourService: TourService,
		private _usuariosService: UsuariosService,
	) {
		this.title = 'Listado de Tour';
		this.token = this._usuariosService.getToken();
	}

	ngOnInit() {
		this.getTours();
	}

	deleteTour(id){
		this._tourService.deleteTour(this.token, id).subscribe(
			response => {
				if (!response.tour) {
					alert('Error en el servidor');	
				}
				this.getTours();
			},
			error => {
				alert('Error en el servidor');
			}
		);
	}

	getTours(){
		this._tourService.getTours().subscribe(
			response => {
				if (!response.tours) {
					
				} else {
					this.tours = response.tours;
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
