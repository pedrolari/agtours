import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallereservahotelComponent } from './detallereservahotel.component';

describe('DetallereservahotelComponent', () => {
  let component: DetallereservahotelComponent;
  let fixture: ComponentFixture<DetallereservahotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallereservahotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallereservahotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
