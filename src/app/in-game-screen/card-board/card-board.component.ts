import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';
// import {Observable} from 'rxjs/Rx';
// import {CardSlotComponent} from '../card-slot/card-slot.component';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.css']
})
export class CardBoardComponent implements OnInit {

  @Input()
  public cards: Card[];

  private handPileSubscription: any;

  constructor(private playerService: PlayerService) { }

  // used for updating the handcards after selling/discarding
  // @ViewChild(CardSlotComponent) slot;

  async ngOnInit() {
    // this.pollHandCards();
    this.getHandPile();
  }

  getHandPile() {
    this.playerService.getHandPile().subscribe(
      request => {
        this.cards = request;
      }
    );
  }
  // not used anymore
  /*
  pollHandCards(): void {
    this.handPileSubscription = Observable.interval(1000).subscribe(x => {
      this.getHandPile();
    });
  }
  */
  recieveHand($event) {
    this.cards = $event;
    // console.log(this.cards);
  }

}
