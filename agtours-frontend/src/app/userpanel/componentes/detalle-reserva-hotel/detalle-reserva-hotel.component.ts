import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
import { Hotel } from "../../../modelos/hotel";
import { ReservaHotel } from "../../../modelos/reservahotel";
import { HotelService } from "../../../servicios/hotel.service";

@Component({
  selector: 'app-detalle-reserva-hotel',
  templateUrl: './detalle-reserva-hotel.component.html',
  providers: [HotelService]
})
export class DetalleReservaHotelComponent implements OnInit {

	public reservahotel: ReservaHotel;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _hotelService: HotelService
	) {
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.getReserva();
	}

	getReserva(){
		// Con el foreach recorremos la url y obtenemos un array con los parametros
		// definimos la variable id para obtener de params['id'] la id del hotel
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._hotelService.getReserva(id).subscribe(
				response => {
					if (!response.reservahotel) {
						this._router.navigate(['/inicio']);
					} else {
						this.reservahotel = response.reservahotel;
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
