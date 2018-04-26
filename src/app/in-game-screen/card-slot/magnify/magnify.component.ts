import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../../shared/models/Card';
import {Hexspace} from '../../../shared/models/hexSpace';

@Component({
  selector: 'app-magnify',
  templateUrl: './magnify.component.html',
  styleUrls: ['./magnify.component.css']
})
export class MagnifyComponent implements OnInit {

  @Input()
  public card: Card;

  @Input()
  public fullscreen: false;

  @Output()
  public closeFullScreen = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    console.log('Clicked on fullscreen card');
    this.closeFullScreen.emit(false);
  }

}
