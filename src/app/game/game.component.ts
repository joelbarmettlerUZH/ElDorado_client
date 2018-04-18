
import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/User';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  implements OnInit {
  users: User[] = [];

  constructor() { }

  ngOnInit() {
    // get users from secure api end point
  }
}
