import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBoardComponent } from './button-board.component';

describe('ButtonBoardComponent', () => {
  let component: ButtonBoardComponent;
  let fixture: ComponentFixture<ButtonBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
