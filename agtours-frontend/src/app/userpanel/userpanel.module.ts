//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserPanelRoutingModule } from './userpanel-routing.module';

//Componentes TOUR
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ReservastourComponent } from './componentes/reservastour/reservastour.component';
import { ReservashotelComponent } from './componentes/reservashotel/reservashotel.component';
import { DetalleReservaComponent } from './componentes/detalle-reserva/detalle-reserva.component';
import { DetalleReservaHotelComponent } from './componentes/detalle-reserva-hotel/detalle-reserva-hotel.component';


// SERVICIOS
import { UserGuard } from '../servicios/user.guard';
import { UsuariosService } from "../servicios/usuarios.service";

@NgModule({
	declarations: [
		InicioComponent,
		ReservastourComponent,
		ReservashotelComponent,
		DetalleReservaComponent,
		DetalleReservaHotelComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		UserPanelRoutingModule
	],
	exports: [
		InicioComponent,
		ReservastourComponent,
		ReservashotelComponent,
		DetalleReservaComponent
	],
	providers: [
		UsuariosService,
		UserGuard
	]
})

export class UserPanelModule { }