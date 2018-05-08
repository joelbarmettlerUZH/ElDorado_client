import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../shared/models/User';
import {MainMenuButtonBoardComponent} from './main-menu-button-board/main-menu-button-board.component';
import {UserService} from '../shared/services/user.service';
import {CharacterSelectionComponent} from './character-selection/character-selection.component';
import {Room} from '../shared/models/Room';
import {saveGameId} from '../shared/cookieHandler';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {

  @Output() changeCharacterRequest = new EventEmitter<string>();

  // @ViewChild('childCharacter')
  // private childCharacter: SelectCharacterComponent;

  @ ViewChild('selectCharacter')
  private selectCharacter: CharacterSelectionComponent;

  @ViewChild('childButtonArea')
  private childButtonArea: MainMenuButtonBoardComponent;

  mainMenuScreen: string;
  me: User;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // clear local storage and delete user.
    this.userService.deleteUser(Number(localStorage.getItem('userId')));
    localStorage.clear();
    // delete local storage and respective user when refreshing
    saveGameId(-1);
    localStorage.setItem('load', 'first');
    this.mainMenuScreen = 'main-menu';
  }



  // G | on home button clicked (see TS main-menu-button-board component, Function C: navigateToMenu)
  // 1. action: on event received: invoke method on select-character component
  // 2. action: see select-character component
  // ToDo exchange paramter
  public restoreMainMenu() {
    // clear local storage and delete user.
    this.userService.deleteUser(Number(localStorage.getItem('userId')));
    localStorage.clear();
    console.log('Restore MainMenu');
    this.selectCharacter.generateMainMenuView();
  }

  // TO DELETE ?
  // // B | on main-menu button clicked (see HTML main-menu-buttons)
  // // 5. action:
  // // a) call corresponding view on child component
  // // 6. action: see select-character component
  //
  // private hostGame(defaultRoom) {
  //   console.log('REST: room created');
  //   this.roomService.createRoom(this.defaultRoom.name, this.defaultRoom.boardnumber)
  //     .subscribe(roomURL => {
  //       this.roomIDURI = roomURL;
  //       console.log(this.roomIDURI);
  //       // this.roomID = roomURL.split('/').slice(-1)[0] ;
  //       // console.log(this.roomID);
  //     });
  //   this.childCharacter.generateHostView();
  // }

  private consultManual() {
    this.selectCharacter.generateManualView();
  }

  // A.1 & A.2 | on join/host button clicked (see HTML join/host-buttons component)
  // 3. action:
  // a) on got request: call join view on child
  // 4. action: see selected-character component

  public changeCharacters(room: Room) {
    console.log('ERHALTEN: HigherCharacterRequest');
    console.log('Room boardID: ' + room.roomID + ' Room name: ' + room.name);
    this.selectCharacter.generateJoinView(room);
  }
}
