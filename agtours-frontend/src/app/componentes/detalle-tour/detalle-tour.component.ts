import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { getLocaleDateTimeFormat } from '@angular/common' ;

import { GLOBAL } from "../../servicios/global";
import { Tour } from "../../modelos/tour";
import { TourService } from "../../servicios/tour.service";
import { UsuariosService } from "../../servicios/usuarios.service";

import { ReservaTour } from "../../modelos/reservatour";


@Component({
	selector: 'app-detalle-tour',
	templateUrl: './detalle-tour.component.html',
	providers: [TourService, UsuariosService]
})
export class DetalleTourComponent implements OnInit {

	public tour: Tour;
	public url: string;
	public identidad;
	public token;
	public numAdulto: number;
	public numInfantil: number;
	public precioTotalAdulto: number;
	public precioTotalInfantil: number;
	public precioTour: string;
	public descuentoTour: string;
	public precioTotal: number;
	public precioTotalDescuento: number;
	public reservatour: ReservaTour;
	public status;
	public idTour;
	public diasTour: string;	

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _tourService: TourService,
		private _usuariosService: UsuariosService
	) {
		this.url = GLOBAL.url;
		this.numAdulto = 0;
		this.numInfantil = 0;
		this.precioTotalAdulto = 0;
		this.precioTotalInfantil = 0;
		this.precioTotal = 0;
		this.precioTour = '0';
		this.descuentoTour = '0';
		this.precioTotalDescuento = 0;
		this.diasTour = '0';

		this.reservatour = new ReservaTour('', '', '', '', '', '0', '0', '', '0', '');
		this.identidad = this._usuariosService.getIdentidad();
		this.token = this._usuariosService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.getTour();

      	// obtenemos la identidad en caso de estar logueados
    	this.identidad = this._usuariosService.getIdentidad();	

    	this.calculos();
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
						this.precioTour = this.tour.precio;
						this.descuentoTour = this.tour.descuento;
						this.reservatour.tour = params['id'];
						this.diasTour = this.tour.diastour;
					}
				},
				error => {
					this._router.navigate(['/inicio']);
					console.log(<any>error);
				}
			);
		});
	}

	sumarDias(fecha, dias){
		fecha.setDate(fecha.getDate() + dias);
		
		return fecha;
	}

	fechaStringToDate(fecha){
		var partes = fecha.split('-');
		// Please pay attention to the month (parts[1]); JavaScript counts months from 0:
		// January - 0, February - 1, etc.
		var mifecha = new Date(partes[0], partes[1] - 1, partes[2]); 
		return mifecha;
	}

	calculos(){

		// FECHAS
		var hoy = new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth()+1; //hoy es 0!
		var yyyy = hoy.getFullYear();
		this.reservatour.fechaVenta = yyyy+'-'+mm+'-'+dd;

		var fechaInicio = this.fechaStringToDate(this.reservatour.fechainicio);
		var fechaFin = this.sumarDias(fechaInicio, this.diasTour);
		var ddfin = fechaFin.getDate();
		var mmfin = fechaFin.getMonth()+1; //hoy es 0!
		var yyyyfin = fechaFin.getFullYear();
		this.reservatour.fechafin = yyyyfin+'-'+mmfin+'-'+ddfin;

		//PRECIOS
		this.precioTotalAdulto = this.numAdulto * parseInt(this.precioTour);
		this.precioTotalInfantil = this.numInfantil * parseInt(this.precioTour);
		this.precioTotal = this.precioTotalAdulto + this.precioTotalInfantil;
		
		if (parseInt(this.tour.descuento) == 0) {
			this.precioTotalDescuento = 0;
			this.reservatour.descuento = '0';
		} else {
			this.precioTotalDescuento = (this.precioTotal * parseInt(this.descuentoTour)) / 100;
			this.reservatour.descuento = this.descuentoTour;
		}	


		this.reservatour.precio = this.precioTotal.toString();
		this.reservatour.preciototal = (this.precioTotal - this.precioTotalDescuento).toString();


	}

    aumentarCantidad($tipo_persona) {
    	
        if ($tipo_persona == 'adulto') {
        	this.numAdulto++;
        	this.reservatour.numAdultos = this.numAdulto.toString();
        	this.calculos();
        } else {
        	this.numInfantil++;
        	this.reservatour.numInfantiles = this.numInfantil.toString();
        	this.calculos();        	
        }
    }

    disminuirCantidad($tipo_persona) {
        if ($tipo_persona == 'adulto') {
        	this.numAdulto--;
        	this.reservatour.numAdultos = this.numAdulto.toString();
        	this.calculos();        	
        } else {
        	this.numInfantil--;
        	this.reservatour.numInfantiles = this.numInfantil.toString();
        	this.calculos();
        }
    }

    addReserva(){
		this._tourService.addReserva(this.token, this.reservatour).subscribe(
			response => {
				if(!response.reservatour){
					this.status = 'error';
				

				} else {
					this.status = 'success';
					this.reservatour = response.reservatour;
					setTimeout((_router: Router) => { this._router.navigate(['/user-panel/reservas-tours']);}, 3000);
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
