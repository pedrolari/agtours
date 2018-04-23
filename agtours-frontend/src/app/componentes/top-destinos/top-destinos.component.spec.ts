import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDestinosComponent } from './top-destinos.component';

describe('TopDestinosComponent', () => {
  let component: TopDestinosComponent;
  let fixture: ComponentFixture<TopDestinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDestinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
