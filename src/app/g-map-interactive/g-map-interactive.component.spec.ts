import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GMapInteractiveComponent } from './g-map-interactive.component';

describe('GMapInteractiveComponent', () => {
  let component: GMapInteractiveComponent;
  let fixture: ComponentFixture<GMapInteractiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GMapInteractiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GMapInteractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
