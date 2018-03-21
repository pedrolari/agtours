import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { VideomodalComponent } from './componentes/videomodal/videomodal.component';
import { SliderMarcasComponent } from './componentes/slider-marcas/slider-marcas.component';
import { ConsejosViajesComponent } from './componentes/consejos-viajes/consejos-viajes.component';
import { ZonaVentaPaquetesComponent } from './componentes/zona-venta-paquetes/zona-venta-paquetes.component';
import { TopDestinosComponent } from './componentes/top-destinos/top-destinos.component';
import { ZonaVideoComponent } from './componentes/zona-video/zona-video.component';
import { TopHotelesComponent } from './componentes/top-hoteles/top-hoteles.component';
import { OfertasViajesComponent } from './componentes/ofertas-viajes/ofertas-viajes.component';
import { SeccionToursComponent } from './componentes/seccion-tours/seccion-tours.component';
import { BusquedaDestinosComponent } from './componentes/busqueda-destinos/busqueda-destinos.component';
import { FondoBusquedaDestinosComponent } from './componentes/fondo-busqueda-destinos/fondo-busqueda-destinos.component';
import { ToursComponent } from './tours/tours.component';
import { HotelesComponent } from './hoteles/hoteles.component';
import { DestinosComponent } from './destinos/destinos.component';
import { GaleriaComponent } from './galeria/galeria.component';




@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    VideomodalComponent,
    SliderMarcasComponent,
    ConsejosViajesComponent,
    ZonaVentaPaquetesComponent,
    TopDestinosComponent,
    ZonaVideoComponent,
    TopHotelesComponent,
    OfertasViajesComponent,
    SeccionToursComponent,
    BusquedaDestinosComponent,
    FondoBusquedaDestinosComponent,
    ToursComponent,
    HotelesComponent,
    DestinosComponent,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
