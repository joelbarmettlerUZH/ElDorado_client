import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainMenuButtonBoardComponent} from './main-menu-button-board.component';

describe('MainMenuButtonBoardComponent', () => {
  let component: MainMenuButtonBoardComponent;
  let fixture: ComponentFixture<MainMenuButtonBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainMenuButtonBoardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuButtonBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
