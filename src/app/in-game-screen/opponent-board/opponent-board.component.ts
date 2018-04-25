import { Component, OnInit } from '@angular/core';
import { Character } from '../../shared/models/character';
import { CHARACTERS } from '../../shared/models/character-database';
import { PlayerService } from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {Observable, Subscribable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../../shared/services/game.service';

@Component({
  selector: 'app-opponent-board',
  templateUrl: './opponent-board.component.html',
  styleUrls: ['./opponent-board.component.css']
})

export class OpponentBoardComponent implements OnInit {
  characters = CHARACTERS;
  players: Player[];
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public current: number;

  private playerSubscription: Subscription;

  constructor(private playerService: PlayerService, private gameService: GameService) {}

  ngOnInit() {
    this.playerSubscription = Observable.interval(1000).subscribe(
      res => {
        this.getCurrent();
      }
    );
    this.getPlayers();
    console.log(this.players);
  }

  getCurrent() {
    this.current = this.gameService.getCurrent().characterNumber;
    /*
    this.gameService.getCurrent().subscribe(
      res => {
        const c: Player = res;
        this.current = c.characterNumber;
      }
    );
    */
  }

  getPlayers(): void {
    console.log(this.ownPlayerId);
    const allPlayers: Player[] = this.gameService.getPlayers();
    this.players = allPlayers.filter(
      player => player.playerId !== this.ownPlayerId
    );
    /*
    this.gameService.getPlayers()
      .subscribe(players => {
        console.log(this.ownPlayerId);
        const allPlayers: Player[] = players;
        this.players = allPlayers.filter(
          player => player.playerId !== this.ownPlayerId
        );
      });
      */
  }

}
