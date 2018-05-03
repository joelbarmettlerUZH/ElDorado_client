import {Component, OnInit} from '@angular/core';
import {Character} from '../../shared/models/character';
import {CHARACTERS} from '../../shared/models/character-database';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {Observable, Subscribable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../../shared/services/game.service';
import {INTERVAL} from '../../shared/services/INTERVAL';
import {Game} from '../../shared/models/Game';

@Component({
  selector: 'app-opponent-board',
  templateUrl: './opponent-board.component.html',
  styleUrls: ['./opponent-board.component.css']
})

export class OpponentBoardComponent implements OnInit {
  players: Player[];
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public current: Player;

  private playerSubscription: Subscription;

  constructor(private playerService: PlayerService, private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.rawGetter().subscribe(
      response => {
        const game: Game = response;
        this.players = game.players;
        this.current = game.current;
        this.players = this.players.filter(
          player => player.playerId !== this.ownPlayerId
        );
        this.playerSubscription = Observable.interval(INTERVAL.opponent()).subscribe(
          res => {
            try {
              this.current = this.gameService.getCurrent();
            } catch (e) {
              console.log('Error in getting current player for opponents');
            }
          }
        );
        // console.log(this.players);
      }
    );
  }
}
