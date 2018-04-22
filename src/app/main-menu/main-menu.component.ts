///<reference path="select-character/select-character.component.ts"/>
import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Room} from '../shared/models/Room';
import {User} from '../shared/models/User';
import {RoomService} from '../shared/services/room.service';
import {UserService} from '../shared/services/user.service';
import {SelectCharacterComponent} from './select-character/select-character.component';
import {MainMenuButtonBoardComponent} from './main-menu-button-board/main-menu-button-board.component';
import {CreateUser} from '../shared/models/createUser';
import {saveTOKEN, saveUser, saveUserId} from '../shared/cookieHandler';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {
  @Output() changeCharacterRequest = new EventEmitter<string>();
  mainMenuScreen: string;
  rooms: any[] = [];
  // myself: User = new User();
  // ToDO get myself from DB
  defaultRoom: Room = new Room();

  @ViewChild('childCharacter')
  private childCharacter: SelectCharacterComponent;

  @ViewChild('childButtonArea')
  private childButtonArea: MainMenuButtonBoardComponent;

  roomID: string;
  private roomIDURI: string;
  private hubba: any[];
  private me: CreateUser;
  private userId: number;
  public token: string;
  public user: User;

  constructor(private roomService: RoomService,
              private userService: UserService) {
  }

  ngOnInit() {
    localStorage.clear();
    this.mainMenuScreen = 'main-menu';
    // localStorage.clear();
    if (localStorage.getItem('userId') == null) {
      this.me = new CreateUser('MeMyselfAndIAndYou', 3);
      console.log('me', this.me);
      this.userService.createUser(this.me).subscribe(res => {
        this.token = res[0];
        this.userId = Number(res[1]);
        saveTOKEN(this.token);
        saveUserId(this.userId);
        // saveUser(this.meAsUser);
        console.log('meAsUserTOKEN:', this.token);
        console.log('meAsUserID:', this.userId);
        console.log('LS user id:', Number(localStorage.getItem('userId')));
        this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe(result => {
          this.user = result;
          saveUser(this.user);
          console.log(result);
          console.log('saved user to LocalStorage:', this.user);
        });
      });
    }
    // this.myself = new User;
  }

  private restoreMainMenu() {
    console.log('Restore MainMenu');
    this.childCharacter.generateMainMenuView();
    // this.childButtons.generateMainMenuView();
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
}
