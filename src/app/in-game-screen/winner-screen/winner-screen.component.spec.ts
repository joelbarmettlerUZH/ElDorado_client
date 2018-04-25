import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WinnerScreenComponent} from './winner-screen.component';

describe('WinnerScreenComponent', () => {
  let component: WinnerScreenComponent;
  let fixture: ComponentFixture<WinnerScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WinnerScreenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
