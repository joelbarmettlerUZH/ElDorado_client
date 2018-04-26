import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnifyComponent } from './magnify.component';

describe('MagnifyComponent', () => {
  let component: MagnifyComponent;
  let fixture: ComponentFixture<MagnifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagnifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
