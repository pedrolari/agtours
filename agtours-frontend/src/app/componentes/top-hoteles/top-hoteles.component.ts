import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Hotel } from "../../modelos/hotel";
import { HotelService } from "../../servicios/hotel.service";

import { GLOBAL } from "../../servicios/global";


@Component({
  selector: 'app-top-hoteles',
  templateUrl: './top-hoteles.component.html',
  providers: [HotelService]
})
export class TopHotelesComponent implements OnInit {

	public hotels: Hotel[];
	public url: string;

	constructor(
		private _hotelService: HotelService
	) { 
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log('Componente de Hoteles cargado');
		this.getHotels();
	}

	getHotels(){
		this._hotelService.getHotels().subscribe(
			response => {
				if (!response.hotels) {
					
				} else {
					this.hotels = response.hotels;
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
