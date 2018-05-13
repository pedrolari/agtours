import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListareservasComponent } from './listareservas.component';

describe('ListareservasComponent', () => {
  let component: ListareservasComponent;
  let fixture: ComponentFixture<ListareservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListareservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListareservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
