//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminRoutingModule } from './admin-routing.module';

//Componentes
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ListComponent } from './componentes/list/list.component';
import { EditComponent } from './componentes/edit/edit.component';
import { AddComponent } from './componentes/add/add.component';

@NgModule({
	declarations: [
		InicioComponent,
		ListComponent,
		EditComponent,
		AddComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		AdminRoutingModule
	],
	exports: [
		InicioComponent,
		ListComponent,
		EditComponent,
		AddComponent
	],
	providers: []
})

export class AdminModule { }