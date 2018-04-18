import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';

@Component({
  selector: 'app-main-menu-button-board',
  templateUrl: './main-menu-button-board.component.html',
  styleUrls: ['./main-menu-button-board.component.css']
})
export class MainMenuButtonBoardComponent implements OnInit {
  @Output() navigationRequest = new EventEmitter<string>();

  buttons = MAINMENUBUTTONS;
  myMap = new Map([
    ['menubutton-hostgame', false],
    ['menubutton-joingame', false],
    ['menubutton-manual', false]
  ]);
  // ToDO: create dict with for each button in buttons, a Boolean;

  menubuttonMenuButtons = true;
  homeButton = false;


  constructor() {
  }

  ngOnInit() {
  }

  changeButtons(target: string) {
    console.log('MainMenuButtonBoardComponent: changeButtonsRequest mit target, ' + target + ', erhalten!');
    // console.log('target: ' + target);
    this.menubuttonMenuButtons = false;
    this.myMap.forEach(key => this.myMap.set(String(key), false));
    this.myMap.set(target, true);
    // console.log('this.menubuttonMenuButtons: ' + this.menubuttonMenuButtons);
    // console.log('this.menubutton-hostgame: ' + this.myMap.get('menubutton-hostgame'));
    // console.log('this.menubutton-joingame: ' + this.myMap.get('menubutton-joingame'));
    // console.log('this.menubutton-manual: ' + this.myMap.get('menubutton-manual'));
    this.homeButton = true;
    // console.log('this.homeButton: ' + this.homeButton)
    this.navigationRequest.emit(target);
    console.log('navigationRequest von main-menu-button-board gesendet! (Empfänger: main-menu)');
  }


  navigateToMenu() {
    console.log('navigateToMenu clicked');
    // this.myMap.forEach(key => this.myMap.set(String(key), false)); // does not work??
    // this.myMap.set('menubutton-hostgame', false); // does not work??
    this.menubuttonMenuButtons = true;
    this.homeButton = false;
    console.log('this.menubuttonMenuButtons: ' + this.menubuttonMenuButtons);
    console.log('this.menubutton-hostgame: ' + this.myMap.get('menubutton-hostgame'));
    console.log('this.menubutton-joingame: ' + this.myMap.get('menubutton-joingame'));
    console.log('this.menubutton-manual: ' + this.myMap.get('menubutton-manual'));
    console.log('this.homeButton: ' + this.homeButton);
  }
}
