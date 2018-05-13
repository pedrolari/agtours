import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from "./global";

@Injectable()
export class HotelService {
	public url: string;

	constructor( private _http: Http ) {
		this.url = GLOBAL.url;
	}

    addHotel(token, hotel) {
        let params = JSON.stringify(hotel);
        let headers = new Headers({
        	'Content-Type':'application/json',
        	'Authorization':token
        })

        return this._http.post(this.url+'hotel', params, {headers: headers})
                         .map(res => res.json());
    }

    getHotels(){
        return this._http.get(this.url+'hotels').map(res => res.json());
    }

    getHotel(id){
        return this._http.get(this.url+'hotel/'+id).map(res => res.json());
    }

    editHotel(token, id, hotel){
        let params = JSON.stringify(hotel);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
        })

        return this._http.put(this.url+'hotel/'+id, params, {headers: headers})
                         .map(res => res.json());
    }

    deleteHotel(token, id){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
        });

        let options = new RequestOptions({ headers: headers});
        return this._http.delete(this.url+'hotel/'+id, options)
                   .map(res => res.json());

    }

     //RESERVAS DE HOTELES
    addReserva(token, reserva){
        let params = JSON.stringify(reserva);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
        })

        return this._http.post(this.url+'hotel-reservas', params, {headers: headers})
                         .map(res => res.json());
    }

    getALLReservas(){
        return this._http.get(this.url+'hotel-reservas/').map(res => res.json());
    } 

    getReservas(id){
        return this._http.get(this.url+'hotel-reservas-usuario/'+id).map(res => res.json());
    } 

    getReserva(id){
        return this._http.get(this.url+'hotel-reservas/'+id).map(res => res.json());
    }
    
    deleteReservaHotel(token, id){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
        });

        let options = new RequestOptions({ headers: headers});
        return this._http.delete(this.url+'hotel-reservas/'+id, options)
                   .map(res => res.json());

    }   
}