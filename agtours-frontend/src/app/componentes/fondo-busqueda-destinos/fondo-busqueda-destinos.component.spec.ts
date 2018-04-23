import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoBusquedaDestinosComponent } from './fondo-busqueda-destinos.component';

describe('FondoBusquedaDestinosComponent', () => {
  let component: FondoBusquedaDestinosComponent;
  let fixture: ComponentFixture<FondoBusquedaDestinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FondoBusquedaDestinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FondoBusquedaDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
