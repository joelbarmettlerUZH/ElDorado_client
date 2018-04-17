import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinButtonsComponent} from './join-buttons.component';

describe('JoinButtonsComponent', () => {
  let component: JoinButtonsComponent;
  let fixture: ComponentFixture<JoinButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinButtonsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
