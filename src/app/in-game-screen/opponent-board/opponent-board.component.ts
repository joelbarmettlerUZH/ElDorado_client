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
  public currentPlayerId = -1;

  constructor(private playerService: PlayerService, private gameService: GameService) {
    this.gameService.currentSub.subscribe(
      current => {
        try {
          this.current = current;
          this.currentPlayerId = this.current.playerId;
        } catch (e) {
          console.log('Opponent Update: Current is not ready yet');
        }
      }
    );
  }

  ngOnInit() {
    this.gameService.rawGetter().subscribe(
      response => {
        const game: Game = response;
        this.players = game.players;
        this.players = this.players.filter(
          player => player.playerId !== this.ownPlayerId
        );
      }
    );
  }
}
