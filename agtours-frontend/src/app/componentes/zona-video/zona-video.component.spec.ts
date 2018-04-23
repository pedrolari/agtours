import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaVideoComponent } from './zona-video.component';

describe('ZonaVideoComponent', () => {
  let component: ZonaVideoComponent;
  let fixture: ComponentFixture<ZonaVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
