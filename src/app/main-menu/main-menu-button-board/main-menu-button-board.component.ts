import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';
import {JoinButtonsComponent} from '../join-buttons/join-buttons.component';
import {Room} from '../../shared/models/Room';
import {User} from '../../shared/models/User';

@Component({
  selector: 'app-main-menu-button-board',
  templateUrl: './main-menu-button-board.component.html',
  styleUrls: ['./main-menu-button-board.component.css']
})
export class MainMenuButtonBoardComponent implements OnInit {
  @Output() HigherCharacterRequest = new EventEmitter<Room>();
  @Output() BackToHomeRequest = new EventEmitter<boolean>();
  @Output() passHigherUserRequest = new EventEmitter<User>();

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
  me: User;

  constructor() {
  }

  ngOnInit() {
  }


  // B | on main-menu button clicked (see HTML main-menu-buttons)
  // 2. action:
  // a) display Home Button
  // b) display right buttons (join or host) by setting value for HTML ngIf
  // 3. action: break

  changeButtons(target: string) {
    console.log('Erhalten: changeButtonsRequest | von Main-Menu-Button-Board | target: ' + target);
    // console.log('target: ' + target);
    this.menubuttonMenuButtons = false;
    this.myMap.forEach(key => this.myMap.set(String(key), false));
    this.myMap.set(target, true);
    // console.log('this.menubuttonMenuButtons: ' + this.menubuttonMenuButtons);
    // console.log('this.menubutton-hostgame: ' + this.myMap.get('menubutton-hostgame'));
    // console.log('this.menubutton-joingame: ' + this.myMap.get('menubutton-joingame'));
    // console.log('this.menubutton-manual: ' + this.myMap.get('menubutton-manual'));
    this.homeButton = true;
    console.log('this.homeButton: ' + this.homeButton);
  }

  // C | on home button clicked (see HTML main-menu-buttons)
  // 1. action:
  // a) let sub menu disappear by setting corresponding class to false (see TS & HTML)
  // b) let main menu reappear by setting corresponding class to true (see TS & HTML)
  // c) ToDO update me in backend
  // d) ToDO update room in backend
  // e) restore main menu view: characters not clickable

  navigateToMenu() {
    console.log('navigateToMenu clicked');

    // a) let sub menu disappear
    this.myMap.forEach(key => {
      this.myMap.set(String(key), false);
      console.log('Info: this.menubuttonMenuButtons: ' + this.menubuttonMenuButtons);
      console.log('Info: this.menubutton-hostgame: ' + this.myMap.get('menubutton-hostgame'));
      console.log('Info: this.menubutton-joingame: ' + this.myMap.get('menubutton-joingame'));
      console.log('Info: this.menubutton-manual: ' + this.myMap.get('menubutton-manual'));
      console.log('Info: this.homeButton: ' + this.homeButton);
    });
    this.myMap.set('menubutton-hostgame', false);
    this.myMap.set('menubutton-joingame', false);
    this.myMap.set('menubutton-manual', false);

    // b) let main menu reappear
    this.menubuttonMenuButtons = true;
    this.homeButton = false;

    // e) restore main menu view: characters not clickable
    // ToDO exchange paramter to something reasonable
    this.BackToHomeRequest.emit(true);
  }

  // A.1 & A.2 | on join/host button clicked (see HTML join/host-buttons component)
  // 2. action:
  // a) on got request: HigherCharacterRequest to main-menu component
  // 3. action: see main-menu component (via HTML)

  changeCharacters(room: Room) {
    console.log('Received: changeCharacterRequest');
    console.log('Room id: ' + room.roomID + ' Room name: ' + room.name);
    this.HigherCharacterRequest.emit(room);
  }
}
