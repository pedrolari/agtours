import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../servicios/global";
import { Tour } from "../../modelos/tour";
import { TourService } from "../../servicios/tour.service";


@Component({
	selector: 'app-detalle-tour',
	templateUrl: './detalle-tour.component.html',
	providers: [TourService]
})
export class DetalleTourComponent implements OnInit {

	public tour: Tour;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _tourService: TourService
	) {
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log('Componente detalle tour cargado');
		this.getTour();
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
