import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class InGameScreenComponent implements OnInit, OnDestroy {
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public loading = INTERVAL.loading();
  private loadingSubscription: Subscription;
  public lastRoundFinished: boolean;
  public winner: Player;
  public game: Game;

  private runningSubscribtion: Subscription;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private gameService: GameService) {
    /*this.gameService.runningSub.subscribe(
      running => {
        try {
          this.winner = this.gameService.getWinners();
          if (!running) {
            this.lastRoundFinished = true;
          }
        } catch (e) {
        }
      }
    );*/
  }


  ngOnInit() {
    this.lastRoundFinished = false;
    this.runningSubscribtion = this.gameService.runningSub.subscribe(
      running => {
        try {
          this.winner = this.gameService.getWinners();
          if (!running) {
            this.lastRoundFinished = true;
          }
        } catch (e) {
        }
      }
    );
    this.loadingSubscription = Observable.interval(1000).subscribe(
      res => {
        try {
          this.loading--;
          if (this.loading <= 0) {
            localStorage.setItem('load', 'notFirst');
            this.loadingSubscription.unsubscribe();
          }
        } catch (e) {
          console.log('-Loading Screen: Error in loading screen');
        }
      }
    );
  }

  ngOnDestroy() {
    console.log('OnDestroy')
    this.runningSubscribtion.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
