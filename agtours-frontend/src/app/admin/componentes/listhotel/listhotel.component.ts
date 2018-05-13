import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from "../../../servicios/global";
import { Hotel } from "../../../modelos/hotel";
import { HotelService } from "../../../servicios/hotel.service";
import { UsuariosService } from "../../../servicios/usuarios.service";
import { UploadService } from "../../../servicios/upload.service";


@Component({
  selector: 'app-listhotel',
  templateUrl: './listhotel.component.html',
  providers: [HotelService, UsuariosService]
})
export class ListhotelComponent implements OnInit {

	public title: string;
	public hotels: Hotel[];
	public token;
	public busqueda;

	constructor( 
		private _route: ActivatedRoute,
		private _router: Router,
		private _hotelService: HotelService,
		private _usuariosService: UsuariosService,
	) {
		this.title = 'Listado de Hoteles';
		this.token = this._usuariosService.getToken();
	}
	ngOnInit() {
		this.getHotels();
	}

	deleteHotel(id){
		this._hotelService.deleteHotel(this.token, id).subscribe(
			response => {
				if (!response.tour) {
					alert('Error en el servidor');	
				}
				this.getHotels();
			},
			error => {
				alert('Error en el servidor');
			}
		);
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
