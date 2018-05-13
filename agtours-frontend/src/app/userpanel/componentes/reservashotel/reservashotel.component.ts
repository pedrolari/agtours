import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
import { Tour } from "../../../modelos/tour";
import { ReservaHotel } from "../../../modelos/reservahotel";
import { HotelService } from "../../../servicios/hotel.service";
import { UsuariosService } from "../../../servicios/usuarios.service";

@Component({
  selector: 'app-reservashotel',
  templateUrl: './reservashotel.component.html',
  providers: [UsuariosService, HotelService]
})
export class ReservashotelComponent implements OnInit {

	public title: string;
	public reservashotels: ReservaHotel[];
	public token;
	public identidad;
	public url: string;
	public status;
	
	constructor( 
		private _route: ActivatedRoute,
		private _router: Router,
		private _hotelService: HotelService,
		private _usuariosService: UsuariosService,
	) {
		this.title = 'Listado de Reservas de Hoteles';
		this.token = this._usuariosService.getToken();
		this.identidad = this._usuariosService.getIdentidad();
	}

	ngOnInit() {
		this.getReservasHotels();
	}

	getReservasHotels(){
		this._hotelService.getReservas(this.identidad._id).subscribe(
			response => {
				if (!response.reservashotels) {
					
				} else {
					this.reservashotels = response.reservashotels;
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	deleteReservaHotel(id){
		this._hotelService.deleteReservaHotel(this.token, id).subscribe(
			response => {
				if (!response.reservashotels) {
					alert('Error en el servidor');	
				}
				this.getReservasHotels();
			},
			error => {
				alert('Error en el servidor');
			}
		);
	}

}
