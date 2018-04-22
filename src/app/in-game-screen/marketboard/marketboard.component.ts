import { Component, OnInit } from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {MarketPlace} from '../../shared/models/MarketPlace';
import {Slot} from '../../shared/models/Slot';
import {savePlayer} from '../../shared/cookieHandler';
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

  constructor(private gameService: GameService) { }

  ngOnInit() {
    // savePlayer(1, 'TESTTOKEN', 3); // Creates a local storage value
    this.isFadedIn = false;
    this.gameId = Number(localStorage.getItem('token'));
    this.getMarket();
  }
  // Get active market cards
  getMarket(): void {
    this.gameService.getMarket()
      .subscribe(response => {
        this.market = response;
        this.passiveSlot = this.market.passive;
        this.activeSlot = this.market.active;
        this.purchasableSlot = this.market.purchasable;
        console.log(this.activeSlot[0].pile[0].name);
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
