import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {Player} from '../../shared/models/Player';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-winner-screen',
  templateUrl: './winner-screen.component.html',
  styleUrls: ['./winner-screen.component.css']
})
export class WinnerScreenComponent implements OnInit {
  public winners: Player[];
  private gameSubscription: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameSubscription = Observable.interval(5000).subscribe(
      res => {
        this.gameService.getWinners().subscribe(
          response => {
            this.winners = response;
          });
      }
    );
  }
}





