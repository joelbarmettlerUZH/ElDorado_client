import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {GameService} from '../shared/services/game.service';
import {INTERVAL} from '../shared/services/INTERVAL';
import {Player} from '../shared/models/Player';
import {Game} from '../shared/models/Game';

@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})
export class InGameScreenComponent implements OnInit {
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public loading = INTERVAL.loading();
  private loadingSubscription: Subscription;
  public lastRoundFinished: boolean;
  public winner: Player;
  private gameSubscription: Subscription;
  public game: Game;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private gameService: GameService) {
  }


  ngOnInit() {
    this.gameService.rawGetter().subscribe(response => {
      this.gameSubscription = Observable.interval(2000).subscribe(
        res => {
          try {
            this.winner = this.gameService.getWinners();
            this.game = this.gameService.getGame();
            if (!this.game.running) {
              this.lastRoundFinished = true;
            }
          } catch (e) {
          }
        }
      );
    });
    this.lastRoundFinished = false;
    this.loadingSubscription = Observable.interval(1000).subscribe(
      res => {
        try {
          this.loading--;
          if (this.loading <= 0) {
            localStorage.setItem('load', 'notFirst');
            this.loadingSubscription.unsubscribe();
          }
        } catch (e) {
          console.log('Error in loading screen');
        }
      }
    );
  }
}
