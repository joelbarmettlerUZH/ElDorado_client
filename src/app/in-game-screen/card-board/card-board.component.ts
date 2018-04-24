import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';
import {Character} from '../../shared/models/character';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Player} from '../../shared/models/Player';
import {CardsService} from '../../shared/services/cards.service';
// import {Observable} from 'rxjs/Rx';
// import {CardSlotComponent} from '../card-slot/card-slot.component';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.css']
})
export class CardBoardComponent implements OnInit {

  public cards: Card[];
  public isActive = false;
  public player: Player;

  private handPileSubscription: Subscription;

  constructor(private playerService: PlayerService,
              private cardsService: CardsService) { }

  // used for updating the handcards after selling/discarding
  // @ViewChild(CardSlotComponent) slot;

  ngOnInit() {
    this.playerService.getPlayer(Number(localStorage.getItem('playerId')))
      .subscribe(response => {
        console.log('get cards of,', Number(localStorage.getItem('playerId')));

        this.player = response;
        console.log(this.player.handPile);
        this.cardsService.setHandCards(this.player.handPile);

        this.handPileSubscription = Observable.interval(1000).subscribe(
          res => {
            this.pollHandPile();
          }
        );
      });
  }


  pollHandPile() {
    this.cards = this.cardsService.getHandCards();
  }

  getHandPile() {
    this.playerService.getPlayer(Number(localStorage.getItem('userId')))
      .subscribe(response => {
        console.log('get cards of,', Number(localStorage.getItem('userId')));

        this.player = response;
        console.log(this.player.handPile);
        this.cardsService.setHandCards(this.player.handPile);
      });
  }
  onSelect() {
    console.log('Is hidden: ' + this.isActive);
    this.isActive = !this.isActive;
    console.log('Is hidden: ' + this.isActive);
  }


}
