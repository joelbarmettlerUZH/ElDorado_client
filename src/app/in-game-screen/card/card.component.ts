import {Component, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {CARDS} from '../../shared/models/Card-database';

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
