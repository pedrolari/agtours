import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Componentes TOUR
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ReservastourComponent } from './componentes/reservastour/reservastour.component';
import { ReservashotelComponent } from './componentes/reservashotel/reservashotel.component';
import { DetalleReservaComponent } from './componentes/detalle-reserva/detalle-reserva.component';
import { DetalleReservaHotelComponent } from './componentes/detalle-reserva-hotel/detalle-reserva-hotel.component';

import { UserGuard } from '../servicios/user.guard';

const userPanelRoutes: Routes = [
	{
		path: 'user-panel',
		component: InicioComponent,
		canActivate: [UserGuard], 
		children: [
			{ path: '', redirectTo: 'reservas-tours', pathMatch: 'full'},
			{ path: 'reservas-tours', component: ReservastourComponent },
			{ path: 'reservas-hoteles', component: ReservashotelComponent },
			{ path: 'detalle-reserva/:id', component: DetalleReservaComponent },
			{ path: 'detalle-reserva-hotel/:id', component: DetalleReservaHotelComponent },
		]
	}
];

@NgModule({
  imports: [
		RouterModule.forChild(userPanelRoutes)
  ],
  exports: [
  		RouterModule
  ]
})

export class UserPanelRoutingModule { }