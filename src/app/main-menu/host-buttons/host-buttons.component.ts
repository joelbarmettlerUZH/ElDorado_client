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
  public inputRoomName: string;
  public subscription: Subscription;
  public user: User;
  characters = CHARACTERS;

  @Output() changeCharacterRequest = new EventEmitter<Room>();


  constructor(private roomService: RoomService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.name = 'BesterRoomNameEver';
    this.inputRoomName = this.name;
  }

  updateRoom() {
    this.name = this.inputRoomName;
    console.log(this.name);
  }

  onRouteSelected(route: Route) {
    // this.roomService.
    this.roomService.createRoom(this.name, route.id).subscribe(response => {
      console.log('REST | POST ' + this.name + ' as new Room', response);
      this.room = response;
    });
    this.changeCharacterRequest.emit(this.room);

    // assign first character
    this.user.character = this.characters[0].id;
    this.userService.modifyUser(this.user);
    console.log('post modify user', this.user);

    // add User to the Room
    this.roomService.addUser(this.user, this.room.roomID).subscribe(response => {
      console.log('REST | POST ' + this.user.name + ' to Room ' + this.room.name, response);
    });

    this.changeCharacterRequest.emit(this.room);
  }
}

// ToDO: In Template set button position automatically
// ToDO: In Template das, was von allen button Typen geshared wird, in eine Klasse



