import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EldoradoReachedScreenComponent} from './eldorado-reached-screen.component';

describe('EldoradoReachedScreenComponent', () => {
  let component: EldoradoReachedScreenComponent;
  let fixture: ComponentFixture<EldoradoReachedScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EldoradoReachedScreenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldoradoReachedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
