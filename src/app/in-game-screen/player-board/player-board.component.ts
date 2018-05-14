import {Component, OnDestroy, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {Game} from '../../shared/models/Game';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../../shared/services/game.service';
import {Observable} from 'rxjs/Observable';
import {INTERVAL} from '../../shared/services/INTERVAL';
import {SettingsService} from '../../shared/services/settings.service';
// import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.css']
})
export class PlayerBoardComponent implements OnInit, OnDestroy {
  public game: Game;
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public ownCharacterId: number = 0;
  public ownPlayer: Player;
  public current: Player;
  public hand: Card[];
  public currentPlayerId = -1;

  public currentSubscribtion: Subscription;
  public playerSubscribtion: Subscription;

  public showCurrent: Boolean;
  private showCurrentSubscription: Subscription;

  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private settingsService: SettingsService) {
  }

  ngOnInit() {

    this.currentSubscribtion = this.gameService.currentSub.subscribe(
      current => {
        try {
          this.current = current;
          this.currentPlayerId = this.current.playerId;
        } catch (e) {
          console.log('-Player Board Update: Current is not ready yet');
        }
      }
    );
    this.playerSubscribtion = this.playerService.playerSub.subscribe(
      player => {
        try {
          this.ownPlayer = player;
          this.ownCharacterId = this.ownPlayer.characterNumber;
        } catch (e) {
          console.log('-Player Board Update: PLayer is not ready yet');
        }
      }
    );
    this.showCurrentSubscription = this.settingsService.showCurrentSub.subscribe(
      show => {
        this.showCurrent = show;
      }
    );
  }

  ngOnDestroy() {
    this.currentSubscribtion.unsubscribe();
    this.playerSubscribtion.unsubscribe();
    this.showCurrentSubscription.unsubscribe();
  }
}
