import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card-slot',
  templateUrl: './card-slot.component.html',
  styleUrls: ['./card-slot.component.css']
})
export class CardSlotComponent implements OnInit {

  @Input()
  public card: Card;

  @Input()
  singleActionCard: boolean;

  // store new Handpile after selling/ discarding
  public hand: Card[];
  // intermediate step to store response from selling/discarding
  public player: Player;
  public isActive = false;
  public specialAction: SpecialAction;
  public margin = 50;
  public playerSubscription: Subscription;
  private selectedCards: Card[];
  public gameSubscription: Subscription;
  public isCurrent = false;
  public isMagnified = false;
  public isActionCard: boolean;


  @Output() actionRequest = new EventEmitter<boolean>();

  constructor(private gameService: GameService,
              private cardsService: CardsService,
              private playerService: PlayerService) {
  }

  ngOnInit() {
    this.isActionCard = false;
    this.specialAction = new SpecialAction();
    console.log(this.card.name);
    this.gameService.rawGetter().subscribe(
      res => {
        const game: Game = res;
        this.isCurrent = game.current.playerId === Number(localStorage.getItem('playerId'));
        this.playerService.rawGetter().subscribe(
          response => {
            const player: Player = response;
            this.specialAction = player.specialAction;
          }
        );
        this.gameSubscription = Observable.interval(INTERVAL.market()).subscribe(
          y => {
            this.getGame();
          }
        );
      }
    );
  }

  getGame() {
    this.isCurrent = this.gameService.getCurrent().playerId === Number(localStorage.getItem('playerId'));
    this.specialAction = this.playerService.getPlayer().specialAction;
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
      }
    );
  }

  onSelect() {
    if (!this.isCurrent) {
      return;
    }
    this.isActive = !this.isActive;
    this.isActionCard = false;
    if (this.specialAction.remove > 0) {
      this.remove();
      this.cardsService.removeHandCard(this.card);
    } else if (this.isActive) {
      this.cardsService.addSelectedCard(this.card);
      this.selectedCards = this.cardsService.getSelectedCards();
      this.isActionCard = this.selectedCards.length === 1 && (this.card.type === 'ActionCard' || this.card.type === 'RemoveActionCard');
      console.log('singleActionCard | slot: ' + this.singleActionCard);
      if (this.isActionCard) {
        this.actionRequest.emit(true);
        console.log('isActionCard | Action Card selected: ' + this.isActionCard);
      }
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
    this.isActionCard = false;
    console.log('isActionCard | after action performed: ' + this.isActionCard);
    this.playerService.performAction(this.card).subscribe(
      res => console.log('Action card was played!')
    );
  }

  closeFullscreen($event) {
    console.log('Requesting to close fullscreen window');
    const close: boolean = $event;
    this.magnify(!close);
  }

  magnify(mag: boolean) {
    console.log('Set magnify to ', mag);
    this.isMagnified = mag;
  }
}
