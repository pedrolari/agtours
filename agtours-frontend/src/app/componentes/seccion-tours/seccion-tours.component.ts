import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Tour } from "../../modelos/tour";
import { TourService } from "../../servicios/tour.service";

import { GLOBAL } from "../../servicios/global";



@Component({
  selector: 'app-seccion-tours',
  templateUrl: './seccion-tours.component.html',
  providers: [TourService]
})

export class SeccionToursComponent implements OnInit {

	public tours: Tour[];
	public url: string;

	constructor(
		private _tourService: TourService
	) { 
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log('Componente de tours cargado');
		this.getTours();
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
