import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../shared/models/Player';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../../shared/services/game.service';
import {SoundService} from '../../shared/services/sound.service';

@Component({
  selector: 'app-last-round-board',
  templateUrl: './last-round-board.component.html',
  styleUrls: ['./last-round-board.component.css']
})
export class LastRoundBoardComponent implements OnInit, OnDestroy {

  public isLastRound = false;
  private winnersSubscription: Subscription;

  constructor(private gameService: GameService, private sound: SoundService) {
  }

  ngOnInit() {
    this.winnersSubscription = this.gameService.winnersSub.subscribe(
      winners => {
        try {
          if (winners.playerId > 0) {
            console.log('-LastRound Update: Winner determined: Id ' + winners.playerId);
            this.isLastRound = true;
            this.sound.backgroundMusicState(false);
            this.sound.winnerState(false);
            this.sound.lastroundState(true);
          }
        } catch (e) {
          console.log('-LastRond Update: Winner not yet determined');
          this.isLastRound = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.winnersSubscription.unsubscribe();
  }
}
