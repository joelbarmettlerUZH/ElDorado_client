import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {Player} from '../../shared/models/Player';
import {PlayerService} from '../../shared/services/player.service';
// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public card: Card;

  public name: string

  constructor() {
  }

  ngOnInit() {
    this.name = this.card.name;
  }



  discard(){

  }

}
