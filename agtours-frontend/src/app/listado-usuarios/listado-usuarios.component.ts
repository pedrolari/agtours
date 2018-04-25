import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from "../servicios/usuarios.service";
import { Usuario } from "../modelos/usuario";
import { GLOBAL } from "../servicios/global";

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  providers: [UsuariosService]
})
export class ListadoUsuariosComponent implements OnInit {
 
    public usuarios: Usuario[];

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _usuariosService: UsuariosService
    ) {}
 
    ngOnInit(){
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
