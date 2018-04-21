import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';
import {RoomService} from '../../shared/services/room.service';
import {Subscription} from 'rxjs/Subscription';
import {Room} from '../../shared/models/Room';
import {User} from '../../shared/models/User';
import {UserService} from '../../shared/services/user.service';
import {CHARACTERS} from '../../shared/models/character-database';

@Component({
  selector: 'app-join-buttons',
  templateUrl: './join-buttons.component.html',
  styleUrls: ['./join-buttons.component.css']
})
export class JoinButtonsComponent implements OnInit {

  @Output() changeCharacterRequest = new EventEmitter<Room>();

  joinButton = MAINMENUBUTTONS.find(obj => obj.id === 'menubutton-joingame');
  rooms: Room[];
  public subscription: Subscription;
  public user: User;
  characters = CHARACTERS;
  public userId: number;


  constructor(private roomService: RoomService,
              private userService: UserService) {
  }

  setRooms(rooms: any[]) {
    this.rooms = rooms;
  }

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'));
    this.subscription = this.roomService.getAllRooms().subscribe(
      res => {
        this.rooms = res;
        console.log('REST | GET All Rooms ', res);
        // console.log('log in Join butoons', this.rooms[0]);
      }
    );
    this.userService.getUser(this.userId).subscribe(response => {
        this.user = response;
        console.log('REST | GET User (self) ', this.user);
      }
    );
  }

  // A | on join button clicked (see HTML join-buttons component)
  // 1. action:
  // a) assign default character & update user
  // b) add user to room
  // c) changeCharacterRequest to main-menu-button-board component
  // 2. action: see main-menu-button-board component (via HTML)

  onRoomSelected(room: Room) {
    // get Array of all characters and remove the ones already in use
    let filteredArray = this.characters;
    console.log('pre filteredArray', filteredArray);
    for (const UserIterator of room.users) {
      filteredArray = filteredArray.filter(function (e) {
        return e.id !== UserIterator.character;
      });
    }
    console.log('filteredArray', filteredArray);
    console.log('pre modify user', this.user);
    // assign first free character
    this.user.character = filteredArray[0].id;
    this.userService.modifyUser(this.user);
    console.log('post modify user', this.user);
    // add User to the Room
    this.roomService.addUser(this.user, room.roomID).subscribe(response => {
      console.log('REST | POST ' + this.user.name + ' to Room ' + room.name, response);
    });
    this.changeCharacterRequest.emit(room);

  }


}
