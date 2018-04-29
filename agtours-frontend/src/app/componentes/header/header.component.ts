import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from "../../servicios/usuarios.service";

import { GLOBAL } from "../../servicios/global";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
    providers: [UsuariosService]

})
export class HeaderComponent implements OnInit, DoCheck {

    public identidad;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router, 
        private _usuariosService: UsuariosService
  	) {
        this.url = GLOBAL.url;
    }

    ngOnInit() {
      	// obtenemos la identidad en caso de estar logueados
    	this.identidad = this._usuariosService.getIdentidad();
    }

    ngDoCheck(){
        this.identidad = this._usuariosService.getIdentidad();
    }

    logout(){
        localStorage.clear();
        this.identidad = null;
        this._router.navigate(['/inicio']);
    }    
}
