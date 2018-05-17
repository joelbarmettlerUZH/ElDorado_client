import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LastRoundBoardComponent} from './last-round-board.component';

describe('LastRoundBoardComponent', () => {
  let component: LastRoundBoardComponent;
  let fixture: ComponentFixture<LastRoundBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LastRoundBoardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastRoundBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
