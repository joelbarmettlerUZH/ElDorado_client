import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {CardsService} from '../../shared/services/cards.service';
import {Slot} from '../../shared/models/Slot';
import {PlayerService} from '../../shared/services/player.service';
import {GameService} from '../../shared/services/game.service';
import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.css']
})
export class MarketCardComponent implements OnInit {

  @Input()
  public card: Card;

  @Input()
  public slot: Slot;

  @Output()
  public magnifiyCard = new EventEmitter<Card>();


  public name: String;
  public isMagnified = false;
  public player: Player;


  constructor(private gameService: GameService,
              private playerService: PlayerService
  ) {
    this.playerService.playerSub.subscribe(
      player => {
        try {
          this.player = player;
        } catch (e) {
          console.log('-Market Update: Player is not ready yet');
        }
      }
    );
  }

  ngOnInit() {
    this.name = this.card.name;
  }



  buy(slot) {
    console.log('-Market: Buy click was triggered:', slot.pile[0].id);
    this.playerService.buy(slot).subscribe(x => console.log('-Market: Bought card:', slot.pile[0].name));
  }

  steal(slot) {
    console.log('-Market: Steal click was triggered (means you have/had steal budget):', slot.pile[0].id);
    this.playerService.steal(slot).subscribe(x => console.log('-Market: Stolen card:', slot.pile[0].name));
  }

  takeCard(slot) {
    if (this.player.specialAction.steal === 0) {
      this.buy(slot);
    } else {
      this.steal(slot);
    }
  }

  magnify(card) {
    console.log("emitttttttttttttttttttt")
    this.magnifiyCard.emit(card);
  }
}

