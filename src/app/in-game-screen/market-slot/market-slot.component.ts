import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';

@Component({
  selector: 'app-market-slot',
  templateUrl: './market-slot.component.html',
  styleUrls: ['./market-slot.component.css']
})
export class MarketSlotComponent implements OnInit {

  constructor() {
  }

  @Input()
  pile: Card[];
  card: Card;

  ngOnInit() {
    this.card = this.pile[0];
  }
}
