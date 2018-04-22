import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { Usuario } from "../modelos/usuario";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// const httpOptions = {
//     headers: new HttpHeaders({
//       // 'Content-Type': 'application/json',
//       'Content-Type': 'application/json;charset=utf-8',
//       'Access-Control-Allow-Headers': 'session-variable',
//       'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Credentials': 'true'
//     })
// };

let headers = new HttpHeaders();
headers = headers.append('Content-Type', 'application/json');
headers = headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
headers = headers.append('Access-Control-Allow-Origin', '*');
headers = headers.append('Access-Control-Allow-Credentials', 'true');

@Injectable()
export class UsuariosService {

  constructor( private http: HttpClient ) { }

  listado() {
    return this.http.get('http://www.abenitoc.com/agencia/php/mostrarClientes.php');
  }
	
	altaUsuario(usuario: Usuario) {
		let body = JSON.stringify(usuario);
		return this.http.post('http://www.abenitoc.com/agencia/php/registrar.php', body, {headers: headers});
  }

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
