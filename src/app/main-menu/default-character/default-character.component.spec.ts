import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCharacterComponent } from './default-character.component';

describe('DefaultCharacterComponent', () => {
  let component: DefaultCharacterComponent;
  let fixture: ComponentFixture<DefaultCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
