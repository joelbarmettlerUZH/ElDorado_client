import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSlotComponent } from './market-slot.component';

describe('MarketSlotComponent', () => {
  let component: MarketSlotComponent;
  let fixture: ComponentFixture<MarketSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
