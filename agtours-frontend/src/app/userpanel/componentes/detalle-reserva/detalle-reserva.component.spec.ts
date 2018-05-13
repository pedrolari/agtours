import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReservaComponent } from './detalle-reserva.component';

describe('DetalleReservaComponent', () => {
  let component: DetalleReservaComponent;
  let fixture: ComponentFixture<DetalleReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
