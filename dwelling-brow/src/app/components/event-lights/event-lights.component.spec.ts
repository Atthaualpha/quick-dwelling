import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLightsComponent } from './event-lights.component';

describe('EventLightsComponent', () => {
  let component: EventLightsComponent;
  let fixture: ComponentFixture<EventLightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
