import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Componentes
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ListComponent } from './componentes/list/list.component';
import { EditComponent } from './componentes/edit/edit.component';
import { AddComponent } from './componentes/add/add.component';

const adminRoutes: Routes = [
	{
		path: 'admin-panel',
		component: InicioComponent, 
		children: [
			{ path: '', redirectTo: 'listado', pathMatch: 'full'},
			{ path: 'listado', component: ListComponent },
			{ path: 'crear', component: AddComponent },
			{ path: 'editar', component: EditComponent }
		]
	}
];

@NgModule({
  imports: [
		RouterModule.forChild(adminRoutes)
  ],
  exports: [
  		RouterModule
  ]
})

export class AdminRoutingModule { }