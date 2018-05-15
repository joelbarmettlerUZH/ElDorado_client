import {Component, OnInit} from '@angular/core';
import {Player} from '../../shared/models/Player';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../../shared/services/game.service';

@Component({
  selector: 'app-last-round-board',
  templateUrl: './last-round-board.component.html',
  styleUrls: ['./last-round-board.component.css']
})
export class LastRoundBoardComponent implements OnInit {

  public isLastRound = false;
  private winnersSubscription: Subscription;
  private winners: Player;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.winnersSubscription = this.gameService.winnersSub.subscribe(
      winners => {
        try {
          this.winners = winners;
          if (this.winners.playerId) {
            this.isLastRound = true;
          }
        } catch (e) {
          console.log('');
        }
      }
    );
  }
}
