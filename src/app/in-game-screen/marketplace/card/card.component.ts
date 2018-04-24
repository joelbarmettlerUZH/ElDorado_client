import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../../shared/models/Card';
import {CardsService} from '../../../shared/services/cards.service';
// import {Player} from '../../../shared/models/Player';
// import {PlayerService} from '../../../shared/services/player.service';
// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public card: Card;

  public name: string;

  constructor(private cardService: CardsService) {
  }

  ngOnInit() {
    this.name = this.card.name;
  }


  // discard(){ }

}
