import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {CardsService} from '../../shared/services/cards.service';
import {CoinsService} from '../../shared/services/coins.service';
import {Subscription} from 'rxjs/Subscription';
import {CardAction} from '../../shared/models/CardAction';
import {SpecialAction} from '../../shared/models/SpecialAction';
import {Observable} from 'rxjs/Observable';

// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card-slot',
  templateUrl: './card-slot.component.html',
  styleUrls: ['./card-slot.component.css']
})
export class CardSlotComponent implements OnInit {

  @Input()
  public card: Card;

  // store new Handpile after selling/ discarding
  public hand: Card[];
  // intermediate step to store response from selling/discarding
  public player: Player;
  public isActive = false;
  public specialAction: SpecialAction;
  public margin = 50;
  public playerSubscription: Subscription;


  constructor(private playerService: PlayerService,
              private cardsService: CardsService,
              private coinsService: CoinsService) {
  }

  ngOnInit() {
    console.log(this.card.name);
    this.playerSubscription = Observable.interval(300).subscribe(
      res => {
        this.getBudget();
      }
    );
  }

  getBudget() {
    this.playerService.getPlayer(Number(localStorage.getItem('playerId'))).subscribe(
      response => {
        const player: Player = response;
        this.specialAction = player.specialAction;
      }
    );
  }

  remove() {
    if (this.specialAction.remove > 0) {
      console.log('Discarding card now');
      this.playerService.discard(this.card).subscribe(res => res);
    } else {
      console.log('Can not discard due to missing budget');
    }
  }

  sell() {
    this.playerService.sell(this.card).subscribe(
      response => {
        this.player = response;
        this.hand = this.player.handPile; // not used for now.
        this.cardsService.removeSelectedCard(this.card);
        this.coinsService.updateLocalCoinNumber(this.player.coins);
      }
    );
  }

  onSelect() {
    this.isActive = !this.isActive;
    if (this.specialAction.remove > 0) {
      this.remove();
      this.cardsService.removeHandCard(this.card);
    } else if (this.isActive) {
      this.cardsService.addSelectedCard(this.card);
    } else {
      this.cardsService.removeSelectedCard(this.card);
    }
  }

  discard() {
    this.playerService.discard(this.card).subscribe(
      response => {
        this.player = response;
        this.hand = this.player.handPile; // not used for now.
        this.cardsService.removeSelectedCard(this.card);
      }
    );
  }

  performAction() {
    // this.playerService.getPlayer(Number(localStorage.getItem('playerId')));
  }

  magnify() {
  }
}
