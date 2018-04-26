import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {Player} from '../../shared/models/Player';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-winner-screen',
  templateUrl: './winner-screen.component.html',
  styleUrls: ['./winner-screen.component.css']
})
export class WinnerScreenComponent implements OnInit {
  public winner: Player;
  private gameSubscription: Subscription;
  @Output() endRequest = new EventEmitter<boolean>();

  constructor(private gameService: GameService, private router: Router) {
  }

  ngOnInit() {
    this.gameSubscription = Observable.interval(5000).subscribe(
      res => {
        this.gameService.getWinners().subscribe(
          response => {
            this.winner = response;
            if (this.winner) {
              this.endRequest.emit(true);
            }
          });
      }
    );
  }

  goToMainScreen() {
    this.router.navigate(['/main-menu']);
  }
}





