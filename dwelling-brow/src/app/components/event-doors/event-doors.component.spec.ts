import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDoorsComponent } from './event-doors.component';

describe('EventDoorsComponent', () => {
  let component: EventDoorsComponent;
  let fixture: ComponentFixture<EventDoorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDoorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDoorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
