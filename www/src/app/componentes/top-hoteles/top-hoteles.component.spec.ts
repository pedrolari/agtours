import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHotelesComponent } from './top-hoteles.component';

describe('TopHotelesComponent', () => {
  let component: TopHotelesComponent;
  let fixture: ComponentFixture<TopHotelesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopHotelesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
