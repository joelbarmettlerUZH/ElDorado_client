///<reference path="select-character/select-character.component.ts"/>
import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Room} from '../shared/models/Room';
import {User} from '../shared/models/User';
import {RoomService} from '../shared/services/room.service';
import {UserService} from '../shared/services/user.service';
import {SelectCharacterComponent} from './select-character/select-character.component';
import {MainMenuButtonBoardComponent} from './main-menu-button-board/main-menu-button-board.component';
import {CreateUser} from '../shared/models/createUser';
import {saveUser} from '../shared/cookieHandler';

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
  private meAsUser: User;
  private userId: number;
  private token: string;

  constructor(private roomService: RoomService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.mainMenuScreen = 'main-menu';
    this.me = new CreateUser('MeMyselfAndI', 4);
    console.log('me', this.me);
    this.userService.createUser(this.me).subscribe(res => {this.meAsUser = res;
      saveUser(this.meAsUser);
      console.log('meAsUser:', this.meAsUser);
    });
    // this.myself = new User;
  }

  navigate(target: string) {
    console.log('Erhalten: navigationRequest | von MainMenuComponent| Target:' + target);
    this.mainMenuScreen = target;
    console.log('Info: this.mainMenuScreen: ' + this.mainMenuScreen);

    if (this.mainMenuScreen === 'main-menu') {
      this.restoreMainMenu();
    }

    if (this.mainMenuScreen === 'menubutton-hostgame') {
      this.meAsUser.userID = 1;
      this.meAsUser.name = 'MyName';
      this.meAsUser.character = 1;
      this.meAsUser.ready = false;

      this.defaultRoom.id = 10;
      this.defaultRoom.name = 'BesterRoomNameEver14';
      this.defaultRoom.users = [this.meAsUser];
      this.defaultRoom.boardnumber = 2;

      this.hostGame(this.defaultRoom);
    }

    if (this.mainMenuScreen === 'menubutton-joingame') {
      this.joinGame();
    }

    if (this.mainMenuScreen === 'menubutton-manual') {
      this.consultManual();
    }

  }

  private restoreMainMenu() {
    console.log('Restore MainMenu');
    this.childCharacter.generateMainMenuView();
    // this.childButtons.generateMainMenuView();
  }

  private hostGame(defaultRoom) {
    console.log('REST: room created');
    this.roomService.createRoom(this.defaultRoom.name, this.defaultRoom.boardnumber)
      .subscribe(roomURL => {
        this.roomIDURI = roomURL;
        console.log(this.roomIDURI);
        // this.roomID = roomURL.split('/').slice(-1)[0] ;
        // console.log(this.roomID);
      });
    this.childCharacter.generateHostView();
  }

  private joinGame() {
    this.childCharacter.generateJoinView();
    console.log('REST: rooms got');
    this.roomService.getAllRooms()
      .subscribe(rooms => {
        this.rooms = rooms;
        console.log(rooms);
        this.hubba = this.rooms.map(a => a.name);
        console.log('Roomname of first room:' + this.hubba[0]);
        // this.rooms = rooms;
        // console.log(this.rooms[0].name);

      });
    this.childButtonArea.setRooms(this.rooms);
  }

  private consultManual() {
    this.childCharacter.generateManualView();
  }
}
