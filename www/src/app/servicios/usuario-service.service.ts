import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class UsuarioServiceService {

  constructor(private http:Http) { }

	//Generamos las funciones que nos serviran para manipular nuestras entidades
	listar() {
	return this.http.get('http://www.abenitoc.com/agencia/php/mostrarClientes.php?opcion=1');
	}
	detalle(id: number) {
	return this.http.get('http://www.abenitoc.com/agencia/php/mostrarClientes.php?opcion=2&id=' + id);
	}
	guardar(item: Object) {
	return this.http.post('http://www.abenitoc.com/agencia/php/mostrarClientes.php?opcion=3', item);
	} 
	modificar(item: Object) {
	return this.http.post('http://www.abenitoc.com/agencia/php/mostrarClientes.php?opcion=4', item);
	}
	eliminar(id: number) {
	throw new Error("Metodo no implementado.");
	}
}
