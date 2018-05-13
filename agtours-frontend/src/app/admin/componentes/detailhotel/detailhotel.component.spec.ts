import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailhotelComponent } from './detailhotel.component';

describe('DetailhotelComponent', () => {
  let component: DetailhotelComponent;
  let fixture: ComponentFixture<DetailhotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailhotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailhotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
