import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuariosService } from "../../servicios/usuarios.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
    providers: [UsuariosService]

})
export class HeaderComponent implements OnInit {

	public identidad;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router, 
  		private _usuariosService: UsuariosService
  	) { }

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
