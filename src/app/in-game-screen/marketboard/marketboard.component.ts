import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {MarketPlace} from '../../shared/models/MarketPlace';
import {Slot} from '../../shared/models/Slot';
import {savePlayer} from '../../shared/cookieHandler';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {CoinsService} from '../../shared/services/coins.service';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
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
  public purchasableSlotIds: number[] = [];
  public gameId: number;
  public isActive = false;
  private marketSubscription: Subscription;
  public ownPlayer: Player;

  constructor(private gameService: GameService,
              private coinsService: CoinsService,
              private playerService: PlayerService
  ) {
    this.coinsService.getLocalCoinNumber().subscribe(response => {
      this.coinNumber = response;
    });
    console.log('Marketboard | CoinNumber: ' + this.coinNumber);
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

  // Fade out Market Board
  onSelect() {
    this.isActive = !this.isActive;
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
        this.purchasableSlot = this.market.purchasable;
        this.purchasableSlotIds = [];
        for (let slot of this.purchasableSlot) {
          this.purchasableSlotIds.push(slot.slotId);
        }
        this.passiveSlot = this.market.passive;
        this.activeSlot = this.market.active;
        this.purchasableSlot = this.market.purchasable;
      });
  }

  buy(slot) {
    console.log('buy click was triggered:', slot.pile[0].id);
    this.playerService.buy(slot).subscribe(x => console.log('bought card:', slot.pile[0].name));
  }

}
