import {Component, Input, OnInit} from '@angular/core';
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
  pile: Card[];
  card: Card;

  ngOnInit() {
    this.pile = this.slot.pile;
    this.card = this.slot.pile[0];
  }
}
