import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InGameScreenComponent } from './in-game-screen.component';

describe('InGameScreenComponent', () => {
  let component: InGameScreenComponent;
  let fixture: ComponentFixture<InGameScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InGameScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InGameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
