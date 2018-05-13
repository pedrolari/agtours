import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservashotelComponent } from './reservashotel.component';

describe('ReservashotelComponent', () => {
  let component: ReservashotelComponent;
  let fixture: ComponentFixture<ReservashotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservashotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservashotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
