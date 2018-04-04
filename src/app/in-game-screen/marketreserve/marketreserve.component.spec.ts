import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketreserveComponent } from './marketreserve.component';

describe('MarketreserveComponent', () => {
  let component: MarketreserveComponent;
  let fixture: ComponentFixture<MarketreserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketreserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketreserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
