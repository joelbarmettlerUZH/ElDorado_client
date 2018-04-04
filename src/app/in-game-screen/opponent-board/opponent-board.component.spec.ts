import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentBoardComponent } from './opponent-board.component';

describe('OpponentBoardComponent', () => {
  let component: OpponentBoardComponent;
  let fixture: ComponentFixture<OpponentBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpponentBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
