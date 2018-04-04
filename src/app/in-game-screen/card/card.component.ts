import {Component, OnInit} from '@angular/core';
import {Card} from '../../Card';
import {CARDS} from '../../Card-database';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cards = CARDS;
  card: Card;

  constructor() {
  }

  ngOnInit() {
  }

}
