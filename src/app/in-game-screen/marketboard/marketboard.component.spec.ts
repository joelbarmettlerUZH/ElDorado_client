import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketboardComponent } from './marketboard.component';

describe('MarketboardComponent', () => {
  let component: MarketboardComponent;
  let fixture: ComponentFixture<MarketboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
