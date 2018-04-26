import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {Player} from '../../shared/models/Player';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Game} from '../../shared/models/Game';
import {Router} from '@angular/router';

@Component({
  selector: 'app-winner-screen',
  templateUrl: './winner-screen.component.html',
  styleUrls: ['./winner-screen.component.css']
})
export class WinnerScreenComponent implements OnInit {
  public winner: Player;
  private gameSubscription: Subscription;

  @Output()
  public endRequest = new EventEmitter<boolean>();

  constructor(private gameService: GameService, private router: Router) {
  }

  ngOnInit() {
    this.gameService.rawGetter().subscribe(
      res => {
        const game: Game = res;
        this.winner = game.winners;
        this.gameSubscription = Observable.interval(5000).subscribe(
          y => this.winner = this.gameService.getWinners()
        );
      }
    );
  }

  goToMainScreen() {
    this.router.navigate(['/main-menu']);
  }
}





