import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
// import { Tour } from "../../../modelos/tour";

import { ReservaTour } from "../../../modelos/reservatour";
import { ReservaHotel } from "../../../modelos/reservahotel";

import { TourService } from "../../../servicios/tour.service";
import { HotelService } from "../../../servicios/hotel.service";

// import { UsuariosService } from "../../../servicios/usuarios.service";

@Component({
  selector: 'app-listareservas',
  templateUrl: './listareservas.component.html',
  providers: [HotelService, TourService]
})

export class ListareservasComponent implements OnInit {

	public reservastours: ReservaTour[];
	public reservashotels: ReservaHotel[];
	public url: string;


	constructor( 
		private _route: ActivatedRoute,
		private _router: Router,
		private _tourService: TourService,
		private _hotelService: HotelService,
	) {

	}

	ngOnInit() {
		this.getALLReservasTours();
		this.getALLReservasHotels();
	}

	getALLReservasTours(){
		this._tourService.getALLReservas().subscribe(
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

	getALLReservasHotels(){
		this._hotelService.getALLReservas().subscribe(
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

}
