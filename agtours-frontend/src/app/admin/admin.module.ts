//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminRoutingModule } from './admin-routing.module';

//Componentes TOUR
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ListComponent } from './componentes/list/list.component';
import { EditComponent } from './componentes/edit/edit.component';
import { AddComponent } from './componentes/add/add.component';

//Componentes HOTEL
import { ListhotelComponent } from './componentes/listhotel/listhotel.component';
import { EdithotelComponent } from './componentes/edithotel/edithotel.component';
import { AddhotelComponent } from './componentes/addhotel/addhotel.component';

// SERVICIOS
import { AdminGuard } from '../servicios/admin.guard';
import { UsuariosService } from "../servicios/usuarios.service";
import { DetailComponent } from './componentes/detail/detail.component';
import { DetailhotelComponent } from './componentes/detailhotel/detailhotel.component';

// TUBERIAS
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
	declarations: [
		InicioComponent,
		ListComponent,
		EditComponent,
		AddComponent,
		DetailComponent,
		SearchPipe,
		AddhotelComponent,
		DetailhotelComponent,
		EdithotelComponent,
		ListhotelComponent
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
	providers: [
		UsuariosService,
		AdminGuard
	]
})

export class AdminModule { }