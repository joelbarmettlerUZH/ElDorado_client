import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ROUTES} from '../../shared/models/mock-routes';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';
import {Route} from '../../shared/models/route';
import {Subscription} from 'rxjs/Subscription';
import {Room} from '../../shared/models/Room';
import {CHARACTERS} from '../../shared/models/character-database';
import {User} from '../../shared/models/User';
import {UserService} from '../../shared/services/user.service';
import {RoomService} from '../../shared/services/room.service';
import {CreateUser} from '../../shared/models/createUser';
import {saveGameId, savePlayerId, saveRoomId, saveTOKEN, saveUserId} from '../../shared/cookieHandler';
import {POLLCHARACTER} from '../../shared/models/defaultPollCharacters';

@Component({
  selector: 'app-host-buttons',
  templateUrl: './host-buttons.component.html',
  styleUrls: ['./host-buttons.component.css']
})
export class HostButtonsComponent implements OnInit {
  routes = ROUTES;
  hostButton = MAINMENUBUTTONS.find(obj => obj.id === 'menubutton-hostgame');
  public room: Room;
  public name: string;
  public subscription: Subscription;
  characters = POLLCHARACTER;
  public token: string;
  public me: User;
  @Output() passUserRequest = new EventEmitter<User>();
  public userId: number;
  private preMe: CreateUser;
  private freeCharacterId: number;

  @Output() changeCharacterRequest = new EventEmitter<Room>();
  private freeCharacterName: string;


  constructor(private roomService: RoomService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.name = 'Rumos magnificos';
  }

  updateRoom(inputstring) {
    this.name = inputstring;
    console.log(this.name);
  }

  // A.2 | on host button clicked (see HTML join-buttons component)
  // 1. action:
  // a) create room
  // b) assign default character & update me
  // c) add me to room
  // d) changeCharacterRequest to main-menu-button-board component
  // e) changeCharacterRequest to main-menu to pass User, me, to select-character component
  // 2. action: see main-menu-button-board component (via HTML)

  onRouteSelected(route: Route) {
    // a) create room
    if (this.name !== 'Rumos magnificos' && this.name !== '') {
      this.roomService.createRoom(this.name, route.id).subscribe(res => {
        console.log('REST | POST ' + this.name + ' as new Room', res);
        this.room = res;

        // b)1 assign first character
        this.freeCharacterId = this.characters[0].id;
        this.freeCharacterName = this.characters[0].name;

        // b)2 create preUser with this id and name
        this.preMe = new CreateUser(this.freeCharacterName, this.freeCharacterId);
        console.log(this.preMe);
        this.userService.createUser(this.preMe).subscribe(resul => {

          // 2.1 save assigned token and ID of preMe
          this.token = resul[0];
          this.userId = Number(resul[1]);
          console.log('Save Token: ' + this.token + 'in localStorage');
          saveTOKEN(this.token);
          console.log('Save User Id: ' + this.userId);
          saveUserId(this.userId);
          console.log('Save Player Id: ' + this.userId);
          savePlayerId(this.userId);
          console.log('Save Room Id: ' + this.room.roomID);
          saveRoomId(this.room.roomID);
          console.log('Save Game Id: ' + this.room.roomID);
          saveGameId(this.room.roomID);

          // 2.2 create User out of preMe
          this.userService.getUser(this.userId).subscribe(result => {
            this.me = result;

            // c) add me to room
            this.roomService.addUserWithToken(this.me, this.room.roomID, this.token).subscribe(response => {
              console.log('REST | POST ' + this.me.name + ' to Room ' + this.room.name);

              // d) changeCharacterRequest to main-menu-button-board component
              console.log('SENT: changeCharacterRequest | from host-buttons');
              console.log('room name: ' + this.room.name + ' room id: ' + this.room.roomID);
              this.changeCharacterRequest.emit(this.room);
            });
          });
        });
      });
    }
  }
}

// ToDO: In Template set button position automatically
// ToDO: In Template das, was von allen button Typen geshared wird, in eine Klasse



