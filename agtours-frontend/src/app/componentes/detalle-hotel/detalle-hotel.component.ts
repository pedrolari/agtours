import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { getLocaleDateTimeFormat } from '@angular/common' ;

import { GLOBAL } from "../../servicios/global";
import { Hotel } from "../../modelos/hotel";
import { HotelService } from "../../servicios/hotel.service";
import { UsuariosService } from "../../servicios/usuarios.service";

import { ReservaHotel } from "../../modelos/reservahotel";

@Component({
	selector: 'app-detalle-hotel',
	templateUrl: './detalle-hotel.component.html',
	providers: [HotelService, UsuariosService]
})
export class DetalleHotelComponent implements OnInit {

	public reservahotel: ReservaHotel;
	public hotel: Hotel;
	public url: string;
	public identidad;
	public token;
	public numAdulto: number;
	public numInfantil: number;	

	public numHabitacioneSimple: number;
	public numHabitacioneDobles: number;

	
	public precioSimple: number;
	public precioDoble: number;
	public precioTotalSimple: number;
	public precioTotalDoble: number;
	public precioTotal: number;
	public precioHotel: string;
	public descuentoHotel: string;
	public precioTotalDescuento: number;
	public status;
	public idHotel;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _hotelService: HotelService,
		private _usuariosService: UsuariosService
	) {
		this.url = GLOBAL.url;
		this.reservahotel = new ReservaHotel('','','','','', '0', '0', '0', '0', '', '', '', '', '');
		this.identidad = this._usuariosService.getIdentidad();
		this.token = this._usuariosService.getToken();

		this.numAdulto = 0;
		this.numInfantil = 0;
		this.numHabitacioneSimple = 0;
		this.numHabitacioneDobles = 0;
		this.precioTotalSimple = 0;
		this.precioTotalDoble = 0;
		this.precioSimple = 0;
		this.precioDoble = 0;
		this.precioTotal = 0;
		this.precioHotel = '0';
		this.descuentoHotel = '0';
		this.precioTotalDescuento = 0;
	}

	ngOnInit() {
		this.getHotel();

      	// obtenemos la identidad en caso de estar logueados
    	this.identidad = this._usuariosService.getIdentidad();	

    	this.calculos();		
	}

	calculos(){

		// FECHAS
		var hoy = new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth()+1; //hoy es 0!
		var yyyy = hoy.getFullYear();
		this.reservahotel.fechaventa = yyyy+'-'+mm+'-'+dd;

		//PRECIOS
		this.precioTotalSimple = this.numHabitacioneSimple * this.precioSimple;
		this.precioTotalDoble = this.numHabitacioneDobles * this.precioDoble;

		this.precioTotal = this.precioTotalSimple + this.precioTotalDoble;
		this.precioTotalDescuento = (this.precioTotal * parseInt(this.descuentoHotel)) / 100;

		this.reservahotel.precio = this.precioTotal.toString();
		this.reservahotel.preciototal = (this.precioTotal - this.precioTotalDescuento).toString();
		this.reservahotel.descuento = this.descuentoHotel;


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

						//Recogemos variables para hacer calculos
						this.precioSimple = parseInt(this.hotel.preciosimple);
						this.precioDoble = parseInt(this.hotel.preciodoble);
						this.descuentoHotel = this.hotel.descuento;
						this.reservahotel.hotel = params['id'];
						this.reservahotel.preciosimple = this.hotel.preciosimple;
						this.reservahotel.preciodoble = this.hotel.preciodoble;

					}
				},
				error => {
					this._router.navigate(['/inicio']);
					console.log(<any>error);
				}
			);
		});
	}

    aumentarCantidad($tipo) {

        if ($tipo == 'adulto') {
        	this.numAdulto++;
        	this.reservahotel.numAdultos = this.numAdulto.toString();
        	this.calculos();
        } else if ($tipo == 'infantil'){
        	this.numInfantil++;
        	this.reservahotel.numInfantiles = this.numInfantil.toString();
        	this.calculos();        	
        } else if ($tipo == 'simple') {
        	this.numHabitacioneSimple++;
        	this.reservahotel.numhabitacionessimples = this.numHabitacioneSimple.toString();
        	this.calculos();
        } else if ($tipo == 'dobles'){
        	this.numHabitacioneDobles++;
        	this.reservahotel.numhabitacionesdobles = this.numHabitacioneDobles.toString();
        	this.calculos();        	
        }        
    }

    disminuirCantidad($tipo) {
        if ($tipo == 'adulto') {
        	this.numAdulto--;
        	this.reservahotel.numAdultos = this.numAdulto.toString();
        	this.calculos();        	
        } else if ($tipo == 'infantil'){
        	this.numInfantil--;
        	this.reservahotel.numInfantiles = this.numInfantil.toString();
        	this.calculos();
        } else if ($tipo == 'simple') {
        	this.numHabitacioneSimple--;
        	this.reservahotel.numhabitacionessimples = this.numHabitacioneSimple.toString();
        	this.calculos();
        } else if ($tipo == 'dobles'){
        	this.numHabitacioneDobles--;
        	this.reservahotel.numhabitacionesdobles = this.numHabitacioneDobles.toString();
        	this.calculos();        	
        } 
    }

    addReserva(){
		this._hotelService.addReserva(this.token, this.reservahotel).subscribe(
			response => {
				if(!response.reservahotel){
					this.status = 'error';
				} else {
					this.status = 'success';
					this.reservahotel = response.reservahotel;
					setTimeout((_router: Router) => { this._router.navigate(['/user-panel/reservas-hoteles']);}, 3000);
				}
			},
			error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
    }

}