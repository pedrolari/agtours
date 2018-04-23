import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaVentaPaquetesComponent } from './zona-venta-paquetes.component';

describe('ZonaVentaPaquetesComponent', () => {
  let component: ZonaVentaPaquetesComponent;
  let fixture: ComponentFixture<ZonaVentaPaquetesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaVentaPaquetesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaVentaPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
