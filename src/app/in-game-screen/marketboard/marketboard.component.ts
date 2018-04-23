import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {MarketPlace} from '../../shared/models/MarketPlace';
import {Slot} from '../../shared/models/Slot';
import {savePlayer} from '../../shared/cookieHandler';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {CoinsService} from '../../shared/services/coins.service';
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
  // coin Number is displayed (see HTML)
  public coinNumber: number;
  public activeSlot: Slot[];
  public passiveSlot: Slot[];
  public purchasableSlot: Slot[];
  public gameId: number;

  private marketSubscription: Subscription;

  constructor(private gameService: GameService,
              private coinsService: CoinsService) {
  }

  ngOnInit() {
    savePlayer(2, 'TESTTOKEN', 4); // Creates a local storage value
    this.isFadedIn = false;
    this.marketSubscription = Observable.interval(1000).subscribe(
      sub => {
        this.getMarket();
      }
    );
    this.coinNumber = this.coinsService.getLocalCoinNumber();
  }

  // Get active market cards
  getMarket(): void {
    this.gameService.getMarket()
      .subscribe(resp => {
        // console.log('Updating market'); WURDE JEDE SEKUNDE GESPAMT
        this.market = resp;
        this.passiveSlot = this.market.passive;
        this.activeSlot = this.market.active;
        this.purchasableSlot = this.market.purchasable;
        // console.log(this.activeSlot[0].pile[0].name);  WURDE JEDE SEKUNDE GESPAMT
        // console.log(this.activeSlot[1].pile[0].name);
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
