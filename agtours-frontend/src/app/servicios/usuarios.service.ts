import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from "./global";

@Injectable()
export class UsuariosService {
  public url: string;

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
	
	// altaUsuario(usuario: Usuario) {
	// 	let body = JSON.stringify(usuario);
	// 	return this.http.post('http://localhost:3789/api/registro', body, {headers: headers});
 //  }

  // actualizarUsuario(usuario) {
  //     let body = JSON.stringify(usuario);
  //     return this.http.put('http://www.abenitoc.com/agencia/php/actualizar.php' + usuario.idcliente, body, httpOptions);
  // }

  // borrarUsuario(usuario) {
  //     return this.http.delete('http://www.abenitoc.com/agencia/php/borrarusuario.php' + usuario.idcliente);
  // }



	// altaUsuario(usuario: Usuario){
	// 	let json = JSON.stringify(usuario);
	// 	let params = 'json='+json;
	// 	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

	// 	return this.http.post('http://www.abenitoc.com/agencia/php/registrar.php', params, {headers: headers})
	// 					 .map(res => res.json());
	// }

}
