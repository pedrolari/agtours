import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UsuariosService } from "../servicios/usuarios.service";
import "rxjs/add/operator/map"; 

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {
 
    usuarios;

    constructor( private crudUsusarios: UsuariosService ) {
    }
 
    ngOnInit(){
      this.crudUsusarios.listado()
      .map((response) => response.json())
      .subscribe(( data ) => {
        this.usuarios = data;
      })

    }
}
