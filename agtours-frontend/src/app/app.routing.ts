import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ToursComponent } from './tours/tours.component';
import { HotelesComponent } from './hoteles/hoteles.component';
import { DestinosComponent } from './destinos/destinos.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { RegistroUltimoComponent } from './registro/registroultimo.component';


const routes: Routes =[
    { path: 'inicio',           component: InicioComponent },
    { path: 'tours',           	component: ToursComponent },
    { path: 'hoteles',       	component: HotelesComponent },
	{ path: 'destinos',         component: DestinosComponent },
	{ path: 'galeria',          component: GaleriaComponent },
	{ path: 'usuarios',         component: ListadoUsuariosComponent },
	{ path: 'registro',         component: RegistroUltimoComponent },
    // { path: '', 				redirectTo: 'inicio', pathMatch: 'full' }
];

export const appRoutingProviders: any []=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

