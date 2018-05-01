import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../servicios/global";
import { Hotel } from "../../modelos/hotel";
import { HotelService } from "../../servicios/hotel.service";

@Component({
	selector: 'app-detalle-hotel',
	templateUrl: './detalle-hotel.component.html',
	providers: [HotelService]
})
export class DetalleHotelComponent implements OnInit {

	public hotel: Hotel;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _hotelService: HotelService
	) {
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log('Componente detalle hotel cargado');
		this.getHotel();
	}

	getHotel(){
		// Con el foreach recorremos la url y obtenemos un array con los parametros
		// definimos la variable id para obtener de params['id'] la id del hotel
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._hotelService.getHotel(id).subscribe(
				response => {
					if (!response.hotel) {
						this._router.navigate(['/inicio']);
					} else {
						this.hotel = response.hotel;
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