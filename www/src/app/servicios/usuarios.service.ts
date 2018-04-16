import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Usuario } from "../modelos/usuario";

@Injectable()
export class UsuariosService {

  constructor(private http:Http) { }

  listado() {
    return this.http.get('http://www.abenitoc.com/agencia/php/mostrarClientes.php');
  }
	
	altaUsuario(usuario: Usuario){
		let json = JSON.stringify(usuario);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this.http.post('http://www.abenitoc.com/agencia/php/registrar.php', params, {headers: headers})
						 .map(res => res.json());
	}

}
