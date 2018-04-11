import {Component, OnInit} from '@angular/core';
import {MAINMENUBUTTONS} from '../../button-database';

@Component({
  selector: 'app-main-menu-buttons',
  templateUrl: './main-menu-buttons.component.html',
  styleUrls: ['./main-menu-buttons.component.css']
})
export class MainMenuButtonsComponent implements OnInit {
  buttons = MAINMENUBUTTONS;
  selectedButtonName: string;

  constructor() {
  }

  setSelectedButton(buttonName: string) {
    this.selectedButtonName = buttonName;
  }

  ngOnInit() {
    this.selectedButtonName = 'menu';
  }
}
