import {Component, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Player} from '../../shared/models/Player';
import {CardsService} from '../../shared/services/cards.service';
import {INTERVAL} from '../../shared/services/INTERVAL';
// import {Observable} from 'rxjs/Rx';
// import {CardSlotComponent} from '../card-slot/card-slot.component';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.css']
})
export class CardBoardComponent implements OnInit {

  public isActive = false;
  public player: Player;
  public cards: Card[];
  public selectedCards: Card[] = [];
  public singleActionCard: boolean;
  private handPileSubscription: Subscription;
  private cardSucbscription: Subscription;


  constructor(private playerService: PlayerService,
              private cardsService: CardsService) {
  }

  // used for updating the handcards after selling/discarding
  // @ViewChild(CardSlotComponent) slot;

  ngOnInit() {
    this.singleActionCard = false;
    this.playerService.rawGetter().subscribe(
      res => {
        const player: Player = res;
        this.cards = player.handPile;
        this.handPileSubscription = Observable.interval(INTERVAL.handpile()).subscribe(
          y => {
            this.getHandPile();
          });
      }
    );
    this.cardSucbscription = Observable.interval(INTERVAL.selectedCards()).subscribe(
      res => {
        this.updateCards();
        this.checkForSingleActionCard();
      }
    );
  }

  updateCards() {
    const newCards: Card[] = this.cardsService.getSelectedCards();
    if (newCards.length !== this.selectedCards.length) {
      console.log('-Card update: Change detected: ', this.selectedCards, newCards);
      this.selectedCards = newCards;
    }
  }


  pollHandPile() {
    this.cards = this.cardsService.getHandCards();
  }

  getHandPile() {
    this.player = this.playerService.getPlayer();
    // console.log('HandCards', this.player.handPile);
    if (JSON.stringify(this.player.handPile) !== JSON.stringify(this.cards)) {
      this.cards = this.player.handPile;
    }
  }

  onSelect() {
    console.log('Is hidden: ' + this.isActive);
    this.isActive = !this.isActive;
    console.log('Is hidden: ' + this.isActive);
  }

  private checkForSingleActionCard() {
    if (this.selectedCards.length === 1) {
      this.singleActionCard = (this.selectedCards[0].type === 'ActionCard' || this.selectedCards[0].type === 'RemoveActionCard');
      console.log('Card Type | board:  ' + this.selectedCards[0].type);
      console.log('singleActionCard | board: ' + this.singleActionCard);
    } else {
      this.singleActionCard = false;
      console.log('singleActionCard | board: ' + this.singleActionCard);
    }
  }
}
