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
    console.log('navigationRequestTo' + target + 'erhalten!');
    console.log('target: ' + target);
    console.log('this.menubuttonMenuButtons: ' + this.menubuttonMenuButtons);
    this.menubuttonMenuButtons = false;
    this.myMap.forEach(key => this.myMap.set(String(key), false));
    this.myMap.set(target, true);
    console.log('this.menubuttonMenuButtons: ' + this.myMap.get('menubutton-hostgame'));
    console.log('this.menubutton-joingame: ' + this.myMap.get('menubutton-joingame'));
    console.log('this.menubutton-manual: ' + this.myMap.get('menubutton-manual'));
  }
}
