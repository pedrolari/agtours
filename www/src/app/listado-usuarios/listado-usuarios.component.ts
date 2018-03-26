import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from "../servicios/usuario-service.service"; //Importamos nuestro servicio
import "rxjs/add/operator/map"; //Libreria para mapear los resultados a JSON

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

	filterargs;
  listado; //Inicializamos la variable en la cual agregaremos nuestro listado de registros
  items;

  constructor( private crudUsuario:UsuarioServiceService ) { }

  ngOnInit() {
  	this.crudUsuario.listar()
    .map((response) => response.json())
    .subscribe((data) => {                
      this.listado = data;
    });
  }

}
