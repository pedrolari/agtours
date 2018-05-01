import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from "./global";

@Injectable()
export class TourService {
	public url: string;

	constructor( private _http: Http ) {
		this.url = GLOBAL.url;
	}

    addTour(token, tour) {
        let params = JSON.stringify(tour);
        let headers = new Headers({
        	'Content-Type':'application/json',
        	'Authorization':token
        })

        return this._http.post(this.url+'tour', params, {headers: headers})
                         .map(res => res.json());
    }

    getTours(){
        return this._http.get(this.url+'tours').map(res => res.json());
    }

    getTour(id){
        return this._http.get(this.url+'tour/'+id).map(res => res.json());
    }

    editTour(token, id, tour){
        let params = JSON.stringify(tour);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
        })

        return this._http.put(this.url+'tour/'+id, params, {headers: headers})
                         .map(res => res.json());
    }

    deleteTour(token, id){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
        });

        let options = new RequestOptions({ headers: headers});
        return this._http.delete(this.url+'tour/'+id, options)
                   .map(res => res.json());

    }

}