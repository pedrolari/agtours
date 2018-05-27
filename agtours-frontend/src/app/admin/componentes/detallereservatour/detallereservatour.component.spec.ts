import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallereservatourComponent } from './detallereservatour.component';

describe('DetallereservatourComponent', () => {
  let component: DetallereservatourComponent;
  let fixture: ComponentFixture<DetallereservatourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallereservatourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallereservatourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
