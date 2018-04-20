import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';
import {JoinButtonsComponent} from '../join-buttons/join-buttons.component';

@Component({
  selector: 'app-main-menu-button-board',
  templateUrl: './main-menu-button-board.component.html',
  styleUrls: ['./main-menu-button-board.component.css']
})
export class MainMenuButtonBoardComponent implements OnInit {
  @Output() navigationRequest = new EventEmitter<string>();

  @ViewChild('childJoinButtons')
  private childJoinButtons: JoinButtonsComponent;

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
    console.log('Erhalten: changeButtonsRequest | von Main-Menu-Button-Board | target: ' + target);
    // console.log('target: ' + target);
    this.menubuttonMenuButtons = false;
    this.myMap.forEach(key => this.myMap.set(String(key), false));
    this.myMap.set(target, true);
    console.log('this.menubuttonMenuButtons: ' + this.menubuttonMenuButtons);
    console.log('this.menubutton-hostgame: ' + this.myMap.get('menubutton-hostgame'));
    console.log('this.menubutton-joingame: ' + this.myMap.get('menubutton-joingame'));
    console.log('this.menubutton-manual: ' + this.myMap.get('menubutton-manual'));
    this.homeButton = true;
    console.log('this.homeButton: ' + this.homeButton);
    this.navigationRequest.emit(target);
    console.log('Gesendet: navigationRequest | von main-menu-button-board | Target:' + target + ' | Empfänger: main-menu');

  }


  navigateToMenu() {
    console.log('navigateToMenu clicked');
    this.myMap.forEach(key => {
      this.myMap.set(String(key), false);
      console.log('Info: this.menubuttonMenuButtons: ' + this.menubuttonMenuButtons);
      console.log('Info: this.menubutton-hostgame: ' + this.myMap.get('menubutton-hostgame'));
      console.log('Info: this.menubutton-joingame: ' + this.myMap.get('menubutton-joingame'));
      console.log('Info: this.menubutton-manual: ' + this.myMap.get('menubutton-manual'));
      console.log('Info: this.homeButton: ' + this.homeButton);
    });
    this.myMap.set('menubutton-hostgame', false);
    this.menubuttonMenuButtons = true;
    this.homeButton = false;
    this.navigationRequest.emit('main-menu');
    console.log('Gesendet: navigationRequest | von main-menu-button-board | Target: main-menu | Empfänger: main-menu');
  }

  setRooms(rooms: any[]) {
    this.childJoinButtons.setRooms(rooms);
  }

}
