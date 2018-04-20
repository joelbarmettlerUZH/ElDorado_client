import { Component, OnInit } from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.css']
})
export class CardBoardComponent implements OnInit {

  public cards: Card[];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getHandPile().subscribe(
      request => {
        this.cards = request;
      }
    )

  }

}
