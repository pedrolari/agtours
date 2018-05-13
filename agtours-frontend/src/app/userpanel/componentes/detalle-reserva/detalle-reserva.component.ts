import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
import { Tour } from "../../../modelos/tour";
import { ReservaTour } from "../../../modelos/reservatour";
import { TourService } from "../../../servicios/tour.service";

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html',
  providers: [TourService]
})
export class DetalleReservaComponent implements OnInit {

	public reservatour: ReservaTour;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _tourService: TourService
	) {
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.getReserva();
	}

	getReserva(){
		// Con el foreach recorremos la url y obtenemos un array con los parametros
		// definimos la variable id para obtener de params['id'] la id del tour
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._tourService.getReserva(id).subscribe(
				response => {
					if (!response.reservatour) {
						this._router.navigate(['/inicio']);
					} else {
						this.reservatour = response.reservatour;
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
