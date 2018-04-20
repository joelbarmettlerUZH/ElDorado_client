import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlayerService} from '../../shared/services/player.service';
import {CardBoardComponent} from '../card-board/card-board.component';
import {Card} from '../../shared/models/Card';
import {Game} from '../../shared/models/Game';

@Component({
  selector: 'app-button-board',
  templateUrl: './button-board.component.html',
  styleUrls: ['./button-board.component.css']
})
export class ButtonBoardComponent implements OnInit {

  constructor(private playerService: PlayerService) {
  }
  // used to store gamestate after EndRound
  public game: Game;

  @Output() updateGame = new EventEmitter<Game>();

  async ngOnInit() {
  }

  endRound() {
    this.playerService.endRound().subscribe(
      response => {
        //console.log(response);
        this.game = response;
        console.log(this.game);
        this.updateGame.emit(this.game);
      });
  }
}
