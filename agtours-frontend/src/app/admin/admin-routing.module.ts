import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Componentes
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ListComponent } from './componentes/list/list.component';
import { EditComponent } from './componentes/edit/edit.component';
import { AddComponent } from './componentes/add/add.component';
import { DetailComponent } from './componentes/detail/detail.component';

import { AdminGuard } from '../servicios/admin.guard';

const adminRoutes: Routes = [
	{
		path: 'admin-panel',
		component: InicioComponent,
		canActivate: [AdminGuard], 
		children: [
			{ path: '', redirectTo: 'listado', pathMatch: 'full'},
			{ path: 'listado', component: ListComponent },
			{ path: 'crear', component: AddComponent },
			{ path: 'editar/:id', component: EditComponent },
			{ path: 'tour/:id', component: DetailComponent }
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