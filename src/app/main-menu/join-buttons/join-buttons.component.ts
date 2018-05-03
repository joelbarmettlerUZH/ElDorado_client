import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';
import {RoomService} from '../../shared/services/room.service';
import {Room} from '../../shared/models/Room';
import {User} from '../../shared/models/User';
import {UserService} from '../../shared/services/user.service';
import {CreateUser} from '../../shared/models/createUser';
import {saveGameId, savePlayerId, saveRoomId, saveTOKEN, saveUserId} from '../../shared/cookieHandler';
import {POLLCHARACTER} from '../../shared/models/defaultPollCharacters';

@Component({
  selector: 'app-join-buttons',
  templateUrl: './join-buttons.component.html',
  styleUrls: ['./join-buttons.component.css']
})
export class JoinButtonsComponent implements OnInit {

  @Output() changeCharacterRequest = new EventEmitter<Room>();

  joinButton = MAINMENUBUTTONS.find(obj => obj.id === 'menubutton-joingame');
  characters = POLLCHARACTER;
  public token: string;
  public me: User;
  private preMe: CreateUser;
  public userId: number;
  public roomId: number;
  private freeCharacterId: number;
  private freeCharacterName: string;
  displayedRooms: Room[];
  start: number;
  private numRoomsToShow = 5;


  constructor(private roomService: RoomService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'));
    this.start = 0;
    this.roomService.getAllRooms(this.start, this.start + this.numRoomsToShow - 1).subscribe(
      res => {
        this.displayedRooms = res;
      }
    );
  }

  // A.1 | on join button clicked (see HTML join-buttons component)
  // 1. action:
  // a) assign default character and its default name & update me
  // b) add me to room
  // c) changeCharacterRequest to main-menu-button-board component
  // d) changeCharacterRequest to main-menu to pass User, me, to select-character component
  // 2.a) action: see main-menu-button-board component (via HTML)
  // 2.b) action: see main-menu component (via HTML)

  onRoomSelected(room: Room) {

    // a)1 get Array of all characters and remove the ones already in use
    let filteredArray = this.characters;
    console.log('pre filteredArray', filteredArray);
    for (const UserIterator of room.users) {
      filteredArray = filteredArray.filter(function (e) {
        return e.id !== UserIterator.character;
      });
    }

    // a)2 get boardID and name of first free character
    this.freeCharacterId = filteredArray[0].id;
    this.freeCharacterName = filteredArray[0].name;

    // a)3 create preUser with this boardID and name
    this.preMe = new CreateUser(this.freeCharacterName, this.freeCharacterId);
    this.userService.createUser(this.preMe).subscribe(res => {

      // 3.1 save assigned token and ID of preMe
      this.token = res[0];
      this.userId = Number(res[1]);
      console.log('Save Token: ' + this.token + 'in localStorage');
      saveTOKEN(this.token);
      console.log('Save User Id: ' + this.userId);
      saveUserId(this.userId);
      console.log('Save Player Id: ' + this.userId);
      savePlayerId(this.userId);
      console.log('Save Room Id: ' + room.roomID);
      saveRoomId(room.roomID);
      console.log('Save Game Id: ' + room.roomID);
      saveGameId(room.roomID);

      // 3.2 create User out of preMe
      this.userService.getUser(this.userId).subscribe(result => {
        this.me = result;
        console.log('1. Me (name) after creation: ' + this.me.name);

        // b) add User to the Room
        this.roomService.addUserWithToken(this.me, room.roomID, this.token).subscribe(response => {
          console.log('REST | POST ' + this.me.name + ' to Room ' + room.name, response);
          // c) changeCharacterRequest to main-menu-button-board component
          console.log('SENT: changeCharacterRequest | from join-buttons');
          console.log('SENT: changeCharacterRequest | room name: ' + room.name + ' room boardID: ' + room.roomID + ' room users: ' + room.users);
          this.changeCharacterRequest.emit(room);
        });
      });
    });
  }

  getPrev() {
    this.start = Math.max(this.start - this.numRoomsToShow, 0);
    console.log('Previous clicked, start: ' + this.start);
    console.log('Previous clicked, end: ' + (this.start + this.numRoomsToShow - 1));
    this.roomService.getAllRooms(this.start, this.start + this.numRoomsToShow - 1).subscribe(
      res => {
        this.displayedRooms = res;
      }
    );
  }

  getNext() {
    console.log('Next clicked, start: ' + (this.start + this.numRoomsToShow));
    console.log('Next clicked, end: ' + (this.start + 2 * this.numRoomsToShow - 1));

    this.roomService.getAllRooms(this.start + this.numRoomsToShow, this.start + 2 * this.numRoomsToShow - 1).subscribe(
      res => {
        if (res) {
          this.displayedRooms = res;
        } else {
          this.start = this.start - this.numRoomsToShow;
          this.roomService.getAllRooms(this.start + this.numRoomsToShow, this.start + 2 * this.numRoomsToShow - 1).subscribe(
            resultat => {
              this.displayedRooms = resultat;
            }
          );
        }
      }
    );
  }
}
