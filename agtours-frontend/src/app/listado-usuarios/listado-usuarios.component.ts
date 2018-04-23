import { Component, OnInit } from '@angular/core';
import { UsuariosService } from "../servicios/usuarios.service";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {
 
    public usuarios;

    constructor( private _usuariosService: UsuariosService ) {
    }
 
    ngOnInit(){
      this._usuariosService.listado().subscribe(
        data => { this.usuarios = data },
        err => console.error(err),
        () => console.log('Cargado correctamente')
      );
    }
}
