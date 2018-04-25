import {Component, Injectable, OnInit} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})

@Injectable()
export class ButtonsComponent implements OnInit {
  buttons = MAINMENUBUTTONS;

  constructor() { }

  ngOnInit() {
  }


}
