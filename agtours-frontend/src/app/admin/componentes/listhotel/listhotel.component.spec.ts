import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListhotelComponent } from './listhotel.component';

describe('ListhotelComponent', () => {
  let component: ListhotelComponent;
  let fixture: ComponentFixture<ListhotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListhotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListhotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
