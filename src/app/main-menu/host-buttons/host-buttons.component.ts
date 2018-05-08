import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';
import {Route} from '../../shared/models/route';
import {Subscription} from 'rxjs/Subscription';
import {Room} from '../../shared/models/Room';
import {User} from '../../shared/models/User';
import {UserService} from '../../shared/services/user.service';
import {RoomService} from '../../shared/services/room.service';
import {CreateUser} from '../../shared/models/createUser';
import {saveGameId, savePlayerId, saveRoomId, saveTOKEN, saveUserId} from '../../shared/cookieHandler';
import {POLLCHARACTER} from '../../shared/models/defaultPollCharacters';
import {BoardService} from '../../shared/services/board.service';

@Component({
  selector: 'app-host-buttons',
  templateUrl: './host-buttons.component.html',
  styleUrls: ['./host-buttons.component.css']
})
export class HostButtonsComponent implements OnInit {
  @Output() passUserRequest = new EventEmitter<User>();
  @Output() changeCharacterRequest = new EventEmitter<Room>();

  hostButton = MAINMENUBUTTONS.find(obj => obj.id === 'menubutton-hostgame');
  characters = POLLCHARACTER;
  public displayedRoutes: Route[];
  public roomRouteId: number;
  public roomIsCreated = false;
  private preMe: CreateUser;
  private freeCharacterId: number;
  private freeCharacterName: string;
  public room: Room;
  public name: string;
  public subscription: Subscription;
  public token: string;
  public me: User;
  public userId: number;
  private start: number;
  private numRoutesToShow = 4;


  constructor(private roomService: RoomService,
              private userService: UserService,
              private boardService: BoardService) {
  }

  ngOnInit() {
    this.name = 'Rumos magnificos';
    this.start = 0;
    this.boardService.getAllBoards(this.start, this.start + this.numRoutesToShow - 1).subscribe(
      res => {
        this.displayedRoutes = res;
        console.log('FirstRoute: ' + this.displayedRoutes[0]);
      }
    );
  }

  updateRoom(event: any) {
    this.name = event.target.value.toString();
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
      console.log('ROUTE ID!!!', route.boardID);
      this.roomIsCreated = true;
      this.roomService.createRoom(this.name, route.boardID).subscribe(res => {
        console.log('REST | POST ' + this.name + ' as new Room', res);
        this.room = res;

        this.roomRouteId = this.room.boardnumber;

        // b)1 assign first character
        this.freeCharacterId = this.characters[0].id;
        this.freeCharacterName = this.characters[0].name;

        // b)2 create preUser with this boardID and name
        this.preMe = new CreateUser(this.freeCharacterName, this.freeCharacterId);
        console.log(this.preMe);
        this.userService.createUser(this.preMe).subscribe(resul => {

          // 2.1 save assigned token and ID of preMe
          this.token = resul[0];
          this.userId = Number(resul[1]);

          console.log('Save User Id: ' + this.userId);
          saveUserId(this.userId);
          console.log('Save Player Id: ' + this.userId);
          savePlayerId(this.userId);
          console.log('Save Room Id: ' + this.room.roomID);
          saveRoomId(this.room.roomID);
          console.log('Save Game Id: ' + this.room.roomID);
          saveGameId(this.room.roomID);
          console.log('Save Token: ' + this.token + ' in localStorage');
          saveTOKEN(resul[0]);
          console.log('Save Token: ' + this.token + ' in localStorage');
          saveTOKEN(this.token);

          // 2.2 create User out of preMe
          this.userService.getUser(this.userId).subscribe(result => {
            this.me = result;

            // c) add me to room
            this.roomService.addUserWithToken(this.me, this.room.roomID, this.token).subscribe(response => {
              console.log('REST | POST ' + this.me.name + ' to Room ' + this.room.name);

              // d) changeCharacterRequest to main-menu-button-board component
              console.log('SENT: changeCharacterRequest | from host-buttons');
              console.log('room name: ' + this.room.name + ' room boardID: ' + this.room.roomID);
              this.changeCharacterRequest.emit(this.room);
            });
          });
        });
      });
    }
  }


  getPrev() {
    this.start = Math.max(this.start - this.numRoutesToShow, 0);
    console.log('Previous clicked, start: ' + this.start);
    console.log('Previous clicked, end: ' + (this.start + this.numRoutesToShow - 1));
    this.boardService.getAllBoards(this.start, this.start + this.numRoutesToShow - 1).subscribe(
      res => {
        this.displayedRoutes = res;
      }
    );
  }

  getNext() {
    console.log('Next clicked, start: ' + (this.start + this.numRoutesToShow));
    console.log('Next clicked, end: ' + (this.start + 2 * this.numRoutesToShow - 1));

    this.boardService.getAllBoards(this.start + this.numRoutesToShow, this.start + 2 * this.numRoutesToShow - 1).subscribe(
      res => {
        if (res) {
          this.displayedRoutes = res;
        } else {
          this.start = this.start - this.numRoutesToShow;
          this.boardService.getAllBoards(this.start + this.numRoutesToShow, this.start + 2 * this.numRoutesToShow - 1).subscribe(
            resultat => {
              this.displayedRoutes = resultat;
            }
          );
        }
      }
    );
  }
}

// ToDO: In Template set button position automatically
// ToDO: In Template das, was von allen button Typen geshared wird, in eine Klasse




