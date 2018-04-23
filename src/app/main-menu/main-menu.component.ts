///<reference path="select-character/select-character.component.ts"/>
import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../shared/models/User';
import {SelectCharacterComponent} from './select-character/select-character.component';
import {MainMenuButtonBoardComponent} from './main-menu-button-board/main-menu-button-board.component';
import {UserService} from '../shared/services/user.service';
import {saveTOKEN, saveUserId} from '../shared/cookieHandler';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {

  @Output() changeCharacterRequest = new EventEmitter<string>();

  @ViewChild('childCharacter')
  private childCharacter: SelectCharacterComponent;

  @ViewChild('childButtonArea')
  private childButtonArea: MainMenuButtonBoardComponent;

  mainMenuScreen: string;
  me: User;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // delete local storage and respective user when refreshing
    this.restoreStorage();
    this.mainMenuScreen = 'main-menu';
  }



  // G | on home button clicked (see TS main-menu-button-board component, Function C: navigateToMenu)
  // 1. action: on event received: invoke method on select-character component
  // 2. action: see select-character component
  // ToDo exchange paramter
  private restoreMainMenu() {
    this.restoreStorage();
    console.log('Restore MainMenu');
    this.childCharacter.generateMainMenuView();
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
    this.childCharacter.generateManualView();
  }

  // A.1 & A.2 | on join/host button clicked (see HTML join/host-buttons component)
  // 3. action:
  // a) on got request: call join view on child
  // 4. action: see selected-character component

  private changeCharacters(room) {
    console.log('ERHALTEN: HigherCharacterRequest');
    console.log('Room id: ' + room.id + ' Room name: ' + room.name + ' Users: ' + room.users);
    this.childCharacter.generateJoinView(room);
  }


  // A.1 & A2 | on join/host button clicked (see HTML join/host-buttons component)
  // 3. action:
  // a) set user
  // b) pass user to child variable (see HTML of selecter-character component)
  // 4. action: break
  setUser(user) {
    this.me = user;
  }

  restoreStorage() {
    if (localStorage.getItem('token') || localStorage.getItem('userId')) {
      console.log('delete token', localStorage.getItem('token'));
      console.log('delete userId', localStorage.getItem('userId'));
      this.userService.deleteUser(Number(localStorage.getItem('userId')));
      localStorage.clear();
    }
  }
}
