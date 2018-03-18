import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasViajesComponent } from './ofertas-viajes.component';

describe('OfertasViajesComponent', () => {
  let component: OfertasViajesComponent;
  let fixture: ComponentFixture<OfertasViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertasViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
