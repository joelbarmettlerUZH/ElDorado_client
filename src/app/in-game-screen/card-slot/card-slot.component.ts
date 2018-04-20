import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';
import {CardBoardComponent} from '../card-board/card-board.component';
import {Player} from '../../shared/models/Player';
// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card-slot',
  templateUrl: './card-slot.component.html',
  styleUrls: ['./card-slot.component.css']
})
export class CardSlotComponent implements OnInit {

  @Input()
  public card: Card;

  @Output() updateHand = new EventEmitter<Card[]>();

  // store new Handpile after selling/ discarding
  public hand: Card[];
  // intermediate step to store response from selling/discarding
  public player: Player;



  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    console.log(this.card.name);
  }

  sell() {
    this.playerService.sell(this.card).subscribe(
      response => {
        //console.log(response);
        this.player = response;
        this.hand = this.player.handPile;
        console.log(this.hand);
        this.updateHand.emit(this.hand);
      }
    );
  }

  discard() {
    this.playerService.discard(this.card).subscribe(
      response => {
        //console.log(response);
        this.player = response;
        this.hand = this.player.handPile;
        console.log(this.hand);
        this.updateHand.emit(this.hand);
      }
    );
  }

  magnify() {
  }
}
