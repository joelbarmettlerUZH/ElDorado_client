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
  public user: User;
  public userId: number;
  characters = CHARACTERS;

  @Output() changeCharacterRequest = new EventEmitter<Room>();


  constructor(private roomService: RoomService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.name = 'Rumos magnificos';
    this.userId = Number(localStorage.getItem('userId'));
    this.userService.getUser(this.userId).subscribe(response => {
        this.user = response;
        console.log('REST | GET User (self) ', this.user);
      }
    );
  }

  updateRoom(inputstring) {
    this.name = inputstring;
    console.log(this.name);
  }

  // A.2 | on host button clicked (see HTML join-buttons component)
  // 1. action:
  // a) assign default character & update user
  // b) add user to room
  // c) changeCharacterRequest to main-menu-button-board component
  // 2. action: see main-menu-button-board component (via HTML)

  onRouteSelected(route: Route) {
    // this.roomService.
    if (this.name !== 'Rumos magnificos' && this.name !== '') {
      this.roomService.createRoom(this.name, route.id).subscribe(response => {
        console.log('REST | POST ' + this.name + ' as new Room', response);
        this.room = response;
        this.roomService.addUser(this.user, this.room.roomID).subscribe(res => {
          console.log('REST | POST ' + this.user.name + ' to Room ' + this.room.name, res);
        });
      });
    }
    this.changeCharacterRequest.emit(this.room);

    // a) assign first character
    this.user.character = this.characters[0].id;
    this.userService.modifyUser(this.user);
    console.log('post modify user', this.user);

    // b) add User to the Room
    this.roomService.addUser(this.user, this.room.roomID).subscribe(response => {
      console.log('REST | POST ' + this.user.name + ' to Room ' + this.room.name, response);
    });

    // c)
    console.log('SENT: changeCharacterRequest | from host-buttons');
    console.log('room name: ' + this.room.name + ' room id: ' + this.room.roomID + ' room users: ' + this.room.users);
    this.changeCharacterRequest.emit(this.room);
  }
}

// ToDO: In Template set button position automatically
// ToDO: In Template das, was von allen button Typen geshared wird, in eine Klasse



