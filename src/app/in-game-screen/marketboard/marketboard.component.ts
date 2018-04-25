import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {MarketPlace} from '../../shared/models/MarketPlace';
import {Slot} from '../../shared/models/Slot';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {CoinsService} from '../../shared/services/coins.service';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-marketboard',
  templateUrl: './marketboard.component.html',
  styleUrls: ['./marketboard.component.css']
})
export class MarketboardComponent implements OnInit {
  isFadedIn: boolean;
  cards: any[];
  private market: MarketPlace;
  public coinNumber: number;
  public activeSlot: Slot[];
  public passiveSlot: Slot[];
  public purchasableSlot: Slot[];
  public purchasableSlotIds: number[] = [];
  public gameId: number;
  public isActive = false;
  private marketSubscription: Subscription;
  public ownPlayer: Player;
  public player: Player;
  private playerSubscription: Subscription;
  private coinSubscription: Subscription;

  constructor(private gameService: GameService,
              private coinsService: CoinsService,
              private playerService: PlayerService
  ) {
    this.coinNumber = this.coinsService.getCoins();
    console.log('Marketboard | CoinNumber: ' + this.coinNumber);
  }

  ngOnInit() {
    this.gameService.rawGetter().subscribe(
      res => {
        const market: MarketPlace = res;
        this.isFadedIn = false;
        this.market = market;
        this.marketSubscription = Observable.interval(1000).subscribe(
          sub => {
            this.getMarket();
          }
        );
        this.playerSubscription = Observable.interval(1000).subscribe(
          sub => this.player = this.playerService.getPlayer()
        );
        this.coinSubscription = Observable.interval(1000).subscribe( y => this.updateCoins());
      }
    );
  }

  updateCoins() {
    this.coinNumber = this.coinsService.getCoins();
  }

  // Fade out Market Board
  onSelect() {
    this.isActive = !this.isActive;
  }

  // Get active market cards
  getMarket(initial: boolean = false) {
    const newMarket: MarketPlace = this.gameService.getMarket();
    if ((JSON.stringify(this.market) === JSON.stringify(newMarket)) && !initial) {
      return;
    }
    console.log('-Market update: DID change, performing update');
    this.market = newMarket;
    this.purchasableSlot = this.market.purchasable;
    this.purchasableSlotIds = [];
    for (const slot of this.purchasableSlot) {
      this.purchasableSlotIds.push(slot.slotId);
    }
    this.passiveSlot = this.market.passive;
    this.activeSlot = this.market.active;
    this.purchasableSlot = this.market.purchasable;
  }

  buy(slot) {
    console.log('buy click was triggered:', slot.pile[0].id);
    this.playerService.buy(slot).subscribe(x => console.log('bought card:', slot.pile[0].name));
  }

  steal(slot) {
    this.playerService.steal(slot).subscribe(x => console.log('Stolen card:', slot.pile[0].name));
  }

  takeCard(slot) {
    if (this.player.specialAction.steal === 0) {
      this.buy(slot);
    } else {
      this.steal(slot);
    }
  }
}
