import {Component, OnInit} from '@angular/core';
import {MAINMENUBUTTONS} from '../../button-database';

@Component({
  selector: 'app-main-menu-button-board',
  templateUrl: './main-menu-button-board.component.html',
  styleUrls: ['./main-menu-button-board.component.css']
})
export class MainMenuButtonBoardComponent implements OnInit {

  buttons = MAINMENUBUTTONS;
  // ToDO: create dict with for each button in buttons, a Boolean;

  menubuttonMenuButtons = true;

  myMap = new Map([
    ['menubutton-hostgame', false],
    ['menubutton-joingame', false],
    ['menubutton-manual', false]
  ]);


  constructor() {
  }

  ngOnInit() {
  }

  navigationRequestTo(target: string) {
    this.menubuttonMenuButtons = false;
    this.myMap.forEach(key => this.myMap.set(String(key), false));
    this.myMap.set(target, true);
    console.log('navigationRequestTo' + target + 'erhalten!');
  }
}
