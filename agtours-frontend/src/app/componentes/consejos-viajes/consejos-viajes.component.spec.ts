import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejosViajesComponent } from './consejos-viajes.component';

describe('ConsejosViajesComponent', () => {
  let component: ConsejosViajesComponent;
  let fixture: ComponentFixture<ConsejosViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejosViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejosViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
