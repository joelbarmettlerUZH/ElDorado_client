import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {GameService} from '../shared/services/game.service';

@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})
export class InGameScreenComponent implements OnInit {
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public loading = 15;
  private loadingSubscription: Subscription;
  public lastRoundFinished: boolean;
  public winner: any;
  private gameSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.gameSubscription = Observable.interval(5000).subscribe(
      res => {
        this.gameService.getWinners().subscribe(
          response => {
            this.winner = response;
            if (this.winner !== []) {
              this.lastRoundFinished = true;
            }
          });
      }
    );
    this.lastRoundFinished = false;
    this.loadingSubscription = Observable.interval(1000).subscribe(
      res => {
        this.loading--;
        if (this.loading <= 0) {
          this.loadingSubscription.unsubscribe();
        }
      }
    );
  }
}
