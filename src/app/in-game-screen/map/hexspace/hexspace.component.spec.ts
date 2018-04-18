import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexspaceComponent } from './hexspace.component';

describe('HexspaceComponent', () => {
  let component: HexspaceComponent;
  let fixture: ComponentFixture<HexspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
