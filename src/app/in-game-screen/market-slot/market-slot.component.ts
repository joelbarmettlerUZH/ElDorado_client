import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {Slot} from '../../shared/models/Slot';

@Component({
  selector: 'app-market-slot',
  templateUrl: './market-slot.component.html',
  styleUrls: ['./market-slot.component.css']
})
export class MarketSlotComponent implements OnInit {

  constructor() {
  }

  @Input()
  slot: Slot;

  @Input()
  isNotPurchasable: boolean;
  pile: Card[];
  card: Card;

  @Output()
  public magnifiyCard2 = new EventEmitter<Card>();


  ngOnInit() {
    this.pile = this.slot.pile;
    this.card = this.slot.pile[0];
  }

  magnify(card) {
    this.magnifiyCard2.emit(card);
  }
}
