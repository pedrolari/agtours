import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UsuariosService {

  constructor(private http:Http) { }

  listado() {
    return this.http.get('http://www.abenitoc.com/agencia/php/mostrarClientes.php');
  }
	
	guardarProducto(producto: Producto){
		let json = JSON.stringify(producto);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'productos', params, {headers: headers})
						 .map(res => res.json());
	}

  // detallar(id: number) {
  //   return this.http.get('' + id);
  // }
  // guardar(item: Object) {
  //   return this.http.post('', item);
  // } 
  // modificar(item: Object) {
  //   return this.http.post('', item);
  // }
  // eliminar(id: number) {
  //   throw new Error("Metoido no implementado.");
  // }

}
