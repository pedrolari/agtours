import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from "./global";

@Injectable()
export class UsuariosService {
  public url: string;
  public identidad;
  public token;

  constructor( private _http: Http ) {
    this.url = GLOBAL.url;
  }

    altaUsuario(user_to_register) {
        let params = JSON.stringify(user_to_register);
        let headers = new Headers({'Content-Type':'application/json'})

        return this._http.post(this.url+'registro', params, {headers: headers})
                        .map(res => res.json());
    }

    listadoUsuarios() {
      return this._http.get(this.url+'usuarios').map(res => res.json());
    }

    signup(usuario_to_login, gettoken = null){

        if(gettoken != null){
            usuario_to_login.gettoken = gettoken;
        }

        let params = JSON.stringify(usuario_to_login);
        let headers = new Headers({'Content-Type':'application/json'});

        return this._http.post(this.url+'login', params, {headers: headers})
                        .map(res => res.json());
    }
	
    getIdentidad(){
        let identidad = JSON.parse(localStorage.getItem('identidad'));
        if(identidad != "undefined"){
            this.identidad = identidad;
        } else {
            this.identidad = null;
        }

        return this.identidad;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token != "undefined"){
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;        
    }

    updateUser(user_to_update){
        let params = JSON.stringify(user_to_update);
        let headers = new Headers({
            //pasamos el token porque esta protegida
            'Content-Type':'application/json',
            'Authorization': this.getToken()
        });

        return this._http.put(this.url+'update-user/'+user_to_update._id, params, {headers: headers})
                        .map(res => res.json());
    }
}
