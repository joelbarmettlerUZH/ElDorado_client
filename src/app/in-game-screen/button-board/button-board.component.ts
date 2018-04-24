import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayerService} from '../../shared/services/player.service';
// import {CardBoardComponent} from '../card-board/card-board.component';
// import {Card} from '../../shared/models/Card';
import {Game} from '../../shared/models/Game';
import {HandcardService} from '../../shared/services/handcards.service';
import {Card} from '../../shared/models/Card';
import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-button-board',
  templateUrl: './button-board.component.html',
  styleUrls: ['./button-board.component.css']
})
export class ButtonBoardComponent implements OnInit {

  @Input() current: Player;
  @Input() ownPlayer: Player;
  public confirmationNeeded: boolean;

  // used to store gamestate after EndRound
  public game: Game;
  public hand: Card[];

  @Output() updateGame = new EventEmitter<Game>();

  constructor(private playerService: PlayerService,
              private handcardService: HandcardService) {
    this.confirmationNeeded = false;
  }

  async ngOnInit() {
    this.confirmationNeeded = false;
  }

  confirmEndRound() {
    this.confirmationNeeded = true;
  }

  endRound() {
    this.confirmationNeeded = false;
    this.playerService.endRound().subscribe(
      response => {
        // console.log(response);
        this.game = response;
        this.hand = this.game.players.find(function (element) {
          return element.playerId === Number(localStorage.getItem('userId'));
        }).handPile;
        this.handcardService.setCards(this.hand);
        // console.log(this.game);
        // this.updateGame.emit(this.game);
      });
  }

  breakEndRound() {
    this.confirmationNeeded = false;
  }
}
