import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PlayerService} from '../../shared/services/player.service';
// import {CardBoardComponent} from '../card-board/card-board.component';
// import {Card} from '../../shared/models/Card';
import {Game} from '../../shared/models/Game';
import {Card} from '../../shared/models/Card';
import {Player} from '../../shared/models/Player';
import {CardsService} from '../../shared/services/cards.service';
import {GameService} from '../../shared/services/game.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-button-board',
  templateUrl: './button-board.component.html',
  styleUrls: ['./button-board.component.css']
})
export class ButtonBoardComponent implements OnInit, OnDestroy {

  private currentSubscribtion: Subscription;
  private playerSubscribtion: Subscription;

  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private cardsService: CardsService) {
    /*this.gameService.currentSub.subscribe(
      current => {
        try {
          this.currentPlayerId = current.playerId;
        } catch (e) {
          console.log('Button Board Error: Current not ready yet');
        }
      }
    );*/
  }

  public confirmationNeeded = false;

  // used to store gamestate after EndRound
  public game: Game;
  public hand: Card[];
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public currentPlayerId = -1;
  public ownPlayerName = '';

  ngOnInit() {
    this.currentSubscribtion = this.gameService.currentSub.subscribe(
      current => {
        try {
          this.currentPlayerId = current.playerId;
        } catch (e) {
          console.log('Button Board Error: Current not ready yet');
        }
      }
    );
    this.playerSubscribtion = this.playerService.playerSub.subscribe(
      player => {
        try {
          this.ownPlayerName = player.name;
        } catch (e) {
          console.log('-Player Board Update: PLayer is not ready yet');
        }
      }
    );
    this.confirmationNeeded = false;
  }

  confirmEndRound() {
    if (this.ownPlayerId === this.currentPlayerId) {
      this.confirmationNeeded = true;
    }
  }

  endRound() {
    this.confirmationNeeded = false;
    this.playerService.endRound().subscribe(
      response => {
        this.game = response;
        this.hand = this.game.players.find(function (element) {
          return element.playerId === Number(localStorage.getItem('userId'));
        }).handPile; // not used for now.
        this.cardsService.setSelectedCards([]);
      });
  }

  breakEndRound() {
    this.confirmationNeeded = false;
  }

  ngOnDestroy() {
    this.currentSubscribtion.unsubscribe();
    this.playerSubscribtion.unsubscribe();
  }
}
