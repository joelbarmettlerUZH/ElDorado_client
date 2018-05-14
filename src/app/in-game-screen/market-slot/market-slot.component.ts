import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {Slot} from '../../shared/models/Slot';
import {Subscription} from 'rxjs/Subscription';
import {SettingsService} from '../../shared/services/settings.service';

@Component({
  selector: 'app-market-slot',
  templateUrl: './market-slot.component.html',
  styleUrls: ['./market-slot.component.css']
})
export class MarketSlotComponent implements OnInit, OnDestroy {

  @Input()
  slot: Slot;

  @Input()
  isNotPurchasable: boolean;
  pile: Card[];
  card: Card;

  @Output()
  public magnifiyCard2 = new EventEmitter<Card>();

  public showMarket: Boolean;
  private showMarketSubscription: Subscription;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.showMarketSubscription = this.settingsService.showMarketSub.subscribe(
      show => {
        this.showMarket = show;
      }
    );
    this.pile = this.slot.pile;
    this.card = this.slot.pile[0];
  }

  magnify(card) {
    this.magnifiyCard2.emit(card);
  }

  ngOnDestroy() {
    this.showMarketSubscription.unsubscribe();
  }
}
