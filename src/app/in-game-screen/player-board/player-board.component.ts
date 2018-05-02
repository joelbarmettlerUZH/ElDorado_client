import {Component, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {Game} from '../../shared/models/Game';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../../shared/services/game.service';
import {Observable} from 'rxjs/Observable';
import {INTERVAL} from '../../shared/services/INTERVAL';
// import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.css']
})
export class PlayerBoardComponent implements OnInit {
  public game: Game;
  public handpile: Card[];
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public ownCharacterId: number;
  public ownPlayer: Player;
  public current: Player;
  private currentSubscription: Subscription;
  public hand: Card[];

  constructor(private playerService: PlayerService, private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.rawGetter().subscribe(
      response => {
        this.playerService.rawGetter().subscribe(
          res => {
            this.ownPlayer = res;
            this.ownCharacterId = this.ownPlayer.characterNumber;
          }
        );
        const game: Game = response;
        this.current = game.current;
        this.currentSubscription = Observable.interval(INTERVAL.opponent()).subscribe(
          () => {
            try {
              this.current = this.gameService.getCurrent();
            } catch (e) {
              console.log('Error in getting current player for own character');
            }
          }
        );
      }
    );
  }

}
