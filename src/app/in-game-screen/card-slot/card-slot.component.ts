import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {CardsService} from '../../shared/services/cards.service';
import {Subscription} from 'rxjs/Subscription';
import {SpecialAction} from '../../shared/models/SpecialAction';
import {Observable} from 'rxjs/Observable';
import {GameService} from '../../shared/services/game.service';
import {Game} from '../../shared/models/Game';
import {INTERVAL} from '../../shared/services/INTERVAL';
import {SoundService} from '../../shared/services/sound.service';

// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card-slot',
  templateUrl: './card-slot.component.html',
  styleUrls: ['./card-slot.component.css']
})
export class CardSlotComponent implements OnInit, OnDestroy {

  @Input()
  public card: Card;

  // store new Handpile after selling/ discarding
  public hand: Card[];
  // intermediate step to store response from selling/discarding
  public player: Player;
  public isActive = false;
  public specialAction: SpecialAction;
  public margin = 50;
  private selectedCards: Card[];
  public isCurrent = false;
  public isMagnified = false;
  public isActionCard: boolean;
  public budgetBoardSelected: boolean;
  public singleActionCard = false;

  private cardSubscription: Subscription;
  private currentSubscription: Subscription;
  private specialActionSubscription: Subscription;


  @Output() actionRequest = new EventEmitter<boolean>();

  constructor(private gameService: GameService,
              private cardsService: CardsService,
              private playerService: PlayerService,
              private sound: SoundService) {
    // Subscription to current player
    /*this.gameService.currentSub.subscribe(
      current => {
        try {
          this.isCurrent = current.playerId === Number(localStorage.getItem('playerId'));
        } catch (e) {
          console.log('-Card Slot Update: Current not yet ready');
        }
      }
    );
    // Subscription to specialAction budget
    this.playerService.specialActionSub.subscribe(
      specialAction => {
        try {
          this.specialAction = specialAction;
        } catch (e) {
          console.log('-Card Slot Update: specialAction not yet ready');
        }
      }
    );
    this.cardsService.selectedardsSub.subscribe(
      selectedCards => {
        try {
          this.singleActionCard = selectedCards.length === 1;
        } catch (e) {
          console.log('-Card Slot Update: specialAction not yet ready');
        }
      }
    );
    // this.ngOnInit();*/
  }

  ngOnInit() {
    // Subscription to current player
    this.currentSubscription = this.gameService.currentSub.subscribe(
      current => {
        try {
          this.isCurrent = current.playerId === Number(localStorage.getItem('playerId'));
        } catch (e) {
          console.log('-Card Slot Update: Current not yet ready');
        }
      }
    );
    // Subscription to specialAction budget
    this.specialActionSubscription = this.playerService.specialActionSub.subscribe(
      specialAction => {
        try {
          this.specialAction = specialAction;
        } catch (e) {
          console.log('-Card Slot Update: specialAction not yet ready');
        }
      }
    );
    this.cardSubscription = this.cardsService.selectedardsSub.subscribe(
      selectedCards => {
        try {
          this.singleActionCard = selectedCards.length === 1;
        } catch (e) {
          console.log('-Card Slot Update: specialAction not yet ready');
        }
      }
    );
    // this.ngOnInit();


    this.isActionCard = false;
    this.budgetBoardSelected = false;
  }

  remove() {
    if (this.specialAction.remove > 0) {
      this.sound.remove();
      console.log('-Card Slot: Discarding card now');
      this.playerService.remove(this.card).subscribe(res => res);
    } else {
      console.log('-Card Slot: Can not discard due to missing budget');
    }
    this.cardsService.removeHandCard(this.card);
  }

  sell() {
    console.log('pressed Sell');
    console.log(this.isCurrent);
    this.sound.sell();
    this.playerService.sell(this.card).subscribe(
      response => {
        console.log(response);
        this.player = response;
        this.hand = this.player.handPile; // not used for now.
        this.cardsService.removeSelectedCard(this.card);
      }
    );
  }

  onSelect() {
    console.log(this.specialAction);
    if (!this.isCurrent) {
      console.log('-Card slot: No cards can be used when not current player');
      return;
    }
    this.isActive = !this.isActive;
    this.isActionCard = false;
    if (this.specialAction.remove > 0) {
      this.remove();
    } else if (this.isActive) {
      this.sound.card();
      this.cardsService.addSelectedCard(this.card);
      this.selectedCards = this.cardsService.getSelectedCards();
      this.isActionCard = this.selectedCards.length === 1 && (this.card.type === 'ActionCard' || this.card.type === 'RemoveActionCard');
      console.log('-Card Slot: singleActionCard | slot: ' + this.singleActionCard);
      if (this.isActionCard) {
        this.actionRequest.emit(true);
        console.log('-Card Slot: isActionCard | Action Card selected: ' + this.isActionCard);
      }
    } else {
      this.cardsService.removeSelectedCard(this.card);
    }
  }

  discard() {
    this.sound.discard();
    this.playerService.discard(this.card).subscribe(
      response => {
        this.player = response;
        this.hand = this.player.handPile; // not used for now.
        this.cardsService.removeSelectedCard(this.card);
      }
    );
  }

  performAction() {
    this.sound.click();
    this.playerService.performAction(this.card).subscribe(
      res => console.log('-Card Slot: Action card was played!')
    );
  }

  closeFullscreen($event) {
    console.log('-Card Slot: Requesting to close fullscreen window');
    const close: boolean = $event;
    this.magnify(!close);
  }

  magnify(mag: boolean) {
    this.sound.click();
    console.log('-Card Slot: Set magnify to ', mag);
    this.isMagnified = mag;
  }

  ngOnDestroy() {
    this.cardsService.getSelectedCards().forEach(card => this.cardsService.removeSelectedCard(card));
    this.cardSubscription.unsubscribe();
    this.specialActionSubscription.unsubscribe();
    this.currentSubscription.unsubscribe();
  }
}
