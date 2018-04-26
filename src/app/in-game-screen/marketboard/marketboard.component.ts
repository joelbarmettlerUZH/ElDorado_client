import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {MarketPlace} from '../../shared/models/MarketPlace';
import {Slot} from '../../shared/models/Slot';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {INTERVAL} from '../../shared/services/INTERVAL';

@Component({
  selector: 'app-marketboard',
  templateUrl: './marketboard.component.html',
  styleUrls: ['./marketboard.component.css']
})
export class MarketboardComponent implements OnInit {
  isFadedIn: boolean;
  cards: any[];
  private market: MarketPlace;
  public coinNumber = '0';
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
  public bought = false;

  constructor(private gameService: GameService,
              private playerService: PlayerService
  ) {
    console.log('Marketboard | CoinNumber: ' + this.coinNumber);
  }

  ngOnInit() {
    this.gameService.rawGetter().subscribe(
      res => {
        this.playerService.rawGetter().subscribe(
          response => {
            const tempPlayer: Player = response;
            this.player = tempPlayer;
            const market: MarketPlace = res;
            this.isFadedIn = false;
            this.market = market;
            console.log('Reached market subscription');
            this.marketSubscription = Observable.interval(INTERVAL.market()).subscribe(
              sub => {
                this.getMarket();
              }
            );
            console.log('Reached player subscription');
            this.playerSubscription = Observable.interval(INTERVAL.market()).subscribe(
              sub => {
                this.player = this.playerService.getPlayer();
                this.bought = this.player.bought;
              }
            );
            console.log('Reached coin subscription');
            this.coinSubscription = Observable.interval(1000).subscribe(y => this.updateCoins());
          });
      }
    );
  }

  updateCoins() {
    this.coinNumber = this.playerService.getPlayer().coins.toPrecision(1);
    if (this.playerService.getPlayer().coins % 1 !== 1) {
      this.coinNumber = this.coinNumber + '\u00BD';
    }
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
