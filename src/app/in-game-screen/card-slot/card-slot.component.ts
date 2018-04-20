import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card-slot',
  templateUrl: './card-slot.component.html',
  styleUrls: ['./card-slot.component.css']
})
export class CardSlotComponent implements OnInit {

  @Input()
  public card: Card;

  constructor() {
  }

  ngOnInit() {
  }

  sell() {

  }

  discard() {
  }

  magnify() {
  }
}
