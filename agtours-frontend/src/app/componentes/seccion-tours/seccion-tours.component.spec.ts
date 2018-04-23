import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionToursComponent } from './seccion-tours.component';

describe('SeccionToursComponent', () => {
  let component: SeccionToursComponent;
  let fixture: ComponentFixture<SeccionToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
