import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BudgetBoardComponent} from './budget-board.component';

describe('BudgetBoardComponent', () => {
  let component: BudgetBoardComponent;
  let fixture: ComponentFixture<BudgetBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetBoardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
