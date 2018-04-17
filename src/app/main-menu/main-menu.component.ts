import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Room} from '../Room';
import {User} from '../User';
import {RoomService} from '../room.service';
import {UserService} from '../user.service';
import {SelectCharacterComponent} from './select-character/select-character.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {
  @Output() changeCharacterRequest = new EventEmitter<string>();
  mainMenuScreen: string;
  rooms: any[] = [];
  myself: User = new User();
  // ToDO get myself from DB
  defaultRoom: Room = new Room();

  @ViewChild('childCharacter')
  private childCharacter: SelectCharacterComponent;
  roomID: string;
  private roomIDURI: string;

  constructor(
    private roomService: RoomService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.mainMenuScreen = 'main-menu';
    this.myself = new User;
  }

  navigate(target: string) {
    console.log('Erhalten: navigationRequest | von MainMenuComponent| Target:' + target);
    this.mainMenuScreen = target;
    console.log('Info: this.mainMenuScreen: ' + this.mainMenuScreen);

    if (this.mainMenuScreen === 'main-menu') {
      this.restoreMainMenu();
    }

    if (this.mainMenuScreen === 'menubutton-hostgame') {
      this.myself.userID = 1;
      this.myself.name = 'MyName';
      this.myself.character = 1;
      this.myself.ready = false;

      this.defaultRoom.id = 10;
      this.defaultRoom.name = 'BesterRoomNameEver11';
      this.defaultRoom.users = [this.myself];
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
    this.roomService.getRooms()
      .subscribe(rooms => {
        this.rooms = rooms;
        console.log(this.rooms[0]);
      });
  }

  private consultManual() {
    this.childCharacter.generateManualView();
  }
}
