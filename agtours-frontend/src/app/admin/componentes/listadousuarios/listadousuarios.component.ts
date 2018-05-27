import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from "../../../servicios/usuarios.service";
import { Usuario } from "../../../modelos/usuario";
import { GLOBAL } from "../../../servicios/global";


@Component({
  selector: 'app-listadousuarios',
  templateUrl: './listadousuarios.component.html',
    providers: [UsuariosService]
})
export class ListadousuariosComponent implements OnInit {

    public usuarios: Usuario[];
    public identidad;
    public url: string;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _usuariosService: UsuariosService
    ) {
    	this.url = GLOBAL.url;
    }
 
    ngOnInit(){
    	this.identidad = this._usuariosService.getIdentidad();

        this._usuariosService.listadoUsuarios().subscribe(
            response => {
                if(!response.users){
                    
                } else {
                    this.usuarios = response.users;
                }
            },
            error => {
            console.log(<any>error);
            }
        );
    }
}
