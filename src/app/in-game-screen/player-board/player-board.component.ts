import { Component, OnInit } from '@angular/core';
import { CHARACTERS } from '../../shared/models/character-database';
import {Character} from '../../shared/models/character';
import {Card} from '../../shared/models/Card';
import {Game} from '../../shared/models/Game';
import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.css']
})
export class PlayerBoardComponent implements OnInit {
  ownCharacter: Character = CHARACTERS[0];

  public game: Game;
  public handpile: Card[];
  public ownPlayerId = Number(localStorage.getItem('playerId'));

  constructor() { }

  ngOnInit() {
  }

  receiveGame($event) {
    // assing playerid to a temporary variable
    const id = this.ownPlayerId;
    // update game after EndRound
    this.game = $event;
    console.log(this.game.players.find(function(element) {
      return element.playerId === id;
    }).handPile);
    // update handcards after EndRound
    this.handpile = this.game.players.find(function(element) {
      return element.playerId === id;
    }).handPile;
  }

}
