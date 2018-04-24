import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {CardsService} from '../../shared/services/cards.service';
import {CoinsService} from '../../shared/services/coins.service';

// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card-slot',
  templateUrl: './card-slot.component.html',
  styleUrls: ['./card-slot.component.css']
})
export class CardSlotComponent implements OnInit {

  @Input()
  public card: Card;

  // @Output() updateHand = new EventEmitter<Card[]>();

  // store new Handpile after selling/ discarding
  public hand: Card[];
  // intermediate step to store response from selling/discarding
  public player: Player;
  public isActive = false;
  public margin = 50;


  constructor(private playerService: PlayerService,
              private cardsService: CardsService,
              private coinsService: CoinsService) {
  }

  ngOnInit() {
    console.log(this.card.name);
  }

  sell() {
    console.log('why you not sell????');
    this.playerService.sell(this.card).subscribe(
      response => {
        // console.log(response);
        this.player = response;
        console.log('seeeeelll response', response);
        this.hand = this.player.handPile;
        console.log('after Sell', this.hand);
        this.cardsService.setHandCards(this.hand);
        this.cardsService.removeSelectedCard(this.card);
        // console.log(this.hand);
        // this.updateHand.emit(this.hand);
        this.coinsService.updateLocalCoinNumber(this.player.coins);
      }
    );
  }

  onSelect() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.cardsService.addSelectedCard(this.card);
    }else {
      this.cardsService.removeSelectedCard(this.card);
    }
  }

  discard() {
    this.playerService.discard(this.card).subscribe(
      response => {
        // console.log(response);
        this.player = response;
        this.hand = this.player.handPile;
        this.cardsService.setHandCards(this.hand);
        this.cardsService.removeSelectedCard(this.card);
        // console.log(this.hand);
        // this.updateHand.emit(this.hand);
      }
    );
  }

  performAction() {
    // this.playerService.getPlayer(Number(localStorage.getItem('playerId')));
  }

  magnify() {
  }
}
