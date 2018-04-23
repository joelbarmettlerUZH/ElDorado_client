import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {MarketPlace} from '../../shared/models/MarketPlace';
import {Slot} from '../../shared/models/Slot';
import {savePlayer} from '../../shared/cookieHandler';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
// import {Card} from '../../shared/models/Card';
// import {MoveWrapper} from '../../shared/models/MoveWrapper';

@Component({
  selector: 'app-marketboard',
  templateUrl: './marketboard.component.html',
  styleUrls: ['./marketboard.component.css']
})
export class MarketboardComponent implements OnInit {
  isFadedIn: boolean;
  cards: any[];
  private market: MarketPlace;
  public activeSlot: Slot[];
  public passiveSlot: Slot[];
  public purchasableSlot: Slot[];
  public gameId: number;

  private marketSubscription: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.isFadedIn = false;
    this.getMarket(true);
    this.marketSubscription = Observable.interval(1000).subscribe(
      sub => {
        this.getMarket();
      }
    );
  }

  // Get active market cards
  getMarket(initial: boolean = false) {
    this.gameService.getMarket()
      .subscribe(resp => {
        // console.log('Updating market');
        if ((JSON.stringify(this.market) === JSON.stringify(resp)) && !initial) {
          return;
        }
        console.log('-Market update: DID change, performing update');
        this.market = resp;
        this.passiveSlot = this.market.passive;
        this.activeSlot = this.market.active;
        this.purchasableSlot = this.market.purchasable;
      });
  }


  fadeInOut() {
    // if (this.isFadedIn){
    //   this.fadeOut();
    // } else{
    //   this.fadeIn();
    // }
  }

  // private fadeOut() {
  //
  // }
  //
  // private fadeIn() {
  //
  // }
}
