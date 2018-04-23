import {Component, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {Game} from '../../shared/models/Game';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';

// import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.css']
})
export class PlayerBoardComponent implements OnInit {
  // ownCharacter: Character = CHARACTERS[0]; // FALSCH, IST CHARACTER DATABASE MOCK ;

  public game: Game;
  public handpile: Card[];
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  protected ownCharacterId: number;
  public ownPlayer: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
      this.getOwnCharacterId();
  }
  getOwnCharacterId(): void {
      this.playerService.getPlayer(this.ownPlayerId)
        .subscribe(response => {
          this.ownPlayer = response;
          this.ownCharacterId = this.ownPlayer.characterNumber;
          console.log('My character id from getOwnCharacterId: ' + this.ownCharacterId);
        });
}
  receiveGame($event) {
    // assing playerId to a temporary variable
    const id = this.ownPlayerId;
    console.log('My character id:' + this.ownCharacterId);
    console.log('My player id:' + this.ownPlayerId);
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
