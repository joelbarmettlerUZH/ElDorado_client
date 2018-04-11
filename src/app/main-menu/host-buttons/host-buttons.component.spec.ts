import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HostButtonsComponent} from './host-buttons.component';

describe('HostButtonsComponent', () => {
  let component: HostButtonsComponent;
  let fixture: ComponentFixture<HostButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostButtonsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
