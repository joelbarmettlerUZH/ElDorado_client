import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {MarketPlace} from '../../shared/models/MarketPlace';
import {Slot} from '../../shared/models/Slot';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {Card} from '../../shared/models/Card';
import {Subscription} from 'rxjs/Subscription';
import {SoundService} from '../../shared/services/sound.service';

@Component({
  selector: 'app-marketboard',
  templateUrl: './marketboard.component.html',
  styleUrls: ['./marketboard.component.css']
})
export class MarketboardComponent implements OnInit, OnDestroy {
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
  public player: Player;
  public bought = false;
  public coins = 0;
  public stealBudget = 0;
  public magnifiedCard: Card;
  public isMagnified: boolean;

  private playerSubscribtion: Subscription;
  private marketSubscribtion: Subscription;

  constructor(private gameService: GameService,
              private playerService: PlayerService,
              private sound: SoundService) {
  }

  ngOnInit() {
    this.marketSubscribtion = this.gameService.marketSub.subscribe(
      market => {
        try {
          this.market = market;
          this.getMarket();
        } catch (e) {
          console.log('-Market Update: Market is not ready yet');
        }
      }
    );
    this.playerSubscribtion = this.playerService.playerSub.subscribe(
      player => {
        try {
          this.player = player;
          this.bought = player.bought;
          this.coins = player.coins;
          this.stealBudget = player.specialAction.steal;
          this.updateCoins();
        } catch (e) {
          console.log('-Market Update: Player is not ready yet');
        }
      }
    );
    this.isFadedIn = false;
  }

  updateCoins() {
    if (Math.floor(this.playerService.getPlayer().coins) !== 0) {
      this.coinNumber = Math.floor(this.playerService.getPlayer().coins).toPrecision(1);
    } else {
      this.coinNumber = '';
    }
    if (this.playerService.getPlayer().coins === 0) {
      this.coinNumber = '0';
    }
    if (this.playerService.getPlayer().coins % 1 !== 0) {
      this.coinNumber = this.coinNumber + '\u00BD';
    }
  }

  // Fade out Market Board
  onSelect() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.sound.close();
    } else {
      this.sound.open();
    }
  }

  // Get active market cards
  getMarket(initial: boolean = false) {
    const newMarket: MarketPlace = this.gameService.getMarket();
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

  magnify(mag: boolean) {
    this.isMagnified = mag;
  }

  closeFullscreen($event) {
    const close: boolean = $event;
    this.magnify(!close);
  }

  setMagnified(card) {
    this.magnifiedCard = card;
    this.magnify(true);
  }

  ngOnDestroy() {
    this.playerSubscribtion.unsubscribe();
    this.marketSubscribtion.unsubscribe();
  }

}

