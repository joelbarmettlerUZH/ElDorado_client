import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {Subscription} from 'rxjs/Subscription';
import {Player} from '../../shared/models/Player';
import {SoundService} from '../../shared/services/sound.service';

@Component({
  selector: 'app-settings-board',
  templateUrl: './settings-board.component.html',
  styleUrls: ['./settings-board.component.css']
})
export class SettingsBoardComponent implements OnInit {

  public isActive = false;
  public isLastRound = false;
  private winnersSubscription: Subscription;
  private winners: Player;
  public gameName: String = '';


  constructor(private gameService: GameService, private sound: SoundService) {
  }

  ngOnInit() {
    this.gameService.rawGetter().subscribe(
      game => {
        this.gameName = game.gameName;
      }
    );
    this.winnersSubscription = this.gameService.winnersSub.subscribe(
      winners => {
        try {
          this.winners = winners;
          if (this.winners.name) {
            this.isLastRound = true;
          }
        } catch (e) {
          console.log('');
        }
      }
    );
  }

  onSelect() {
    if (this.isActive) {
      this.sound.close();
    } else {
      this.sound.open();
    }
    this.isActive = !this.isActive;
  }
}
