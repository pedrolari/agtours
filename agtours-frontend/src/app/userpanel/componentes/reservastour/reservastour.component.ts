import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
import { Tour } from "../../../modelos/tour";
import { ReservaTour } from "../../../modelos/reservatour";
import { TourService } from "../../../servicios/tour.service";
import { UsuariosService } from "../../../servicios/usuarios.service";
import { UploadService } from "../../../servicios/upload.service";

@Component({
  selector: 'app-reservastour',
  templateUrl: './reservastour.component.html',
  providers: [UsuariosService, TourService, UploadService]
})
export class ReservastourComponent implements OnInit {

	public title: string;
	public reservastours: ReservaTour[];
	public token;
	public identidad;
	public url: string;
	public status;
	
	constructor( 
		private _route: ActivatedRoute,
		private _router: Router,
		private _tourService: TourService,
		private _usuariosService: UsuariosService,
	) {
		this.title = 'Listado de Reservas de Tours';
		this.token = this._usuariosService.getToken();
		this.identidad = this._usuariosService.getIdentidad();
	}

	ngOnInit() {
		this.getReservasTours();
	}

	getReservasTours(){
		this._tourService.getReservas(this.identidad._id).subscribe(
			response => {
				if (!response.reservastours) {
					
				} else {
					this.reservastours = response.reservastours;
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	deleteReservaTour(id){
		this._tourService.deleteReservaTour(this.token, id).subscribe(
			response => {
				if (!response.reservastours) {
					alert('Error en el servidor');	
				}
				this.getReservasTours();
			},
			error => {
				alert('Error en el servidor');
			}
		);
	}

}
