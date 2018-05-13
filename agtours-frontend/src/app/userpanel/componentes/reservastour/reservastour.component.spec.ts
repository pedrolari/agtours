import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservastourComponent } from './reservastour.component';

describe('ReservastourComponent', () => {
  let component: ReservastourComponent;
  let fixture: ComponentFixture<ReservastourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservastourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservastourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
