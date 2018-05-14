import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SettingsService {

  private showPathfinder: Boolean = true;
  public showPathfinderSub: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(this.showPathfinder);

  private showCurrent: Boolean = true;
  public showCurrentSub: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(this.showCurrent);

  private showMarket: Boolean = true;
  public showMarketSub: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(this.showMarket);

  constructor() { }

  public showPathfinderState() {
    this.showPathfinder = !this.showPathfinder;
    this.showPathfinderSub.next(this.showPathfinder);
  }

  public showCurrentState() {
    this.showCurrent = !this.showCurrent;
    this.showCurrentSub.next(this.showCurrent);
  }

  public showMarketState() {
    this.showMarket = !this.showMarket;
    this.showMarketSub.next(this.showMarket);
  }

}
