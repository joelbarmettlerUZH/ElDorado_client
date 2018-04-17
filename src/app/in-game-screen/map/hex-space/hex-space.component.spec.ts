import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexSpaceComponent } from './hex-space.component';

describe('HexSpaceComponent', () => {
  let component: HexSpaceComponent;
  let fixture: ComponentFixture<HexSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
