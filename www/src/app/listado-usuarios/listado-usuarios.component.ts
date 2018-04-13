import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

    private usuarios;
 
    constructor( private http: HttpClient ){
    }
 
    ngOnInit(){
      this.getData();
    }
 configUrl = 'http://abenitoc.com/agencia/php/prueba.php';
    getData(){
      return this.http.get(this.configUrl);
        // this.http.get('http://abenitoc.com/agencia/php/prueba.php')
        //     .subscribe(res => this.usuarios = res.json());
    }
}
