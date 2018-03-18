import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaDestinosComponent } from './busqueda-destinos.component';

describe('BusquedaDestinosComponent', () => {
  let component: BusquedaDestinosComponent;
  let fixture: ComponentFixture<BusquedaDestinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaDestinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
