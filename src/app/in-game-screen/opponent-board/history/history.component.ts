import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../../shared/models/Player';
import {CardAction} from '../../../shared/models/CardAction';
import {Card} from '../../../shared/models/Card';

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

  constructor() { }

  ngOnInit() {
  }

  magnify(mag: boolean) {
    console.log('-Card Slot: Set magnify to ', mag);
    this.isMagnified = mag;
  }
}
