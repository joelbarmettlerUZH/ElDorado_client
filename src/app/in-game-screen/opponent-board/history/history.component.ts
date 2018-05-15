import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../../shared/models/Player';
import {CardAction} from '../../../shared/models/CardAction';
import {Card} from '../../../shared/models/Card';
import {SoundService} from '../../../shared/services/sound.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Input()
  public history: CardAction[];

  @Output() actionRequest = new EventEmitter<boolean>();

  public isMagnified = false;
  public magCard: Card;

  constructor(private sound: SoundService) { }

  ngOnInit() {
  }

  magnify(card: Card, mag: boolean) {
    this.sound.click();
    console.log('-Card Slot: Set magnify to ', mag);
    this.magCard = card;
    this.isMagnified = mag;
  }
}
