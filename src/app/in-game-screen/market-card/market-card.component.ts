import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {CardsService} from '../../shared/services/cards.service';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.css']
})
export class MarketCardComponent implements OnInit {

  @Input()
  public card: Card;

  @Input()
  public name: string;

  public isMagnified = false;


  constructor(private cardService: CardsService) {
  }

  ngOnInit() {
    this.name = this.card.name;
  }

  magnify(mag: boolean) {
    this.isMagnified = mag;
  }

  closeFullscreen($event) {
    const close: boolean = $event;
    this.magnify(!close);
  }
}

