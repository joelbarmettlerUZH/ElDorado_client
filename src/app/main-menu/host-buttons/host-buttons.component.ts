import {Component, OnInit} from '@angular/core';
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
  rooms: Room[];
  public subscription: Subscription;
  public user: User;
  characters = CHARACTERS;


  constructor(private roomService: RoomService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  onRouteSelected(route: Route) {
  }
}

// ToDO: In Template set button position automatically
// ToDO: In Template das, was von allen button Typen geshared wird, in eine Klasse



