import {Component, OnInit} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';

@Component({
  selector: 'app-join-buttons',
  templateUrl: './join-buttons.component.html',
  styleUrls: ['./join-buttons.component.css']
})
export class JoinButtonsComponent implements OnInit {

  joinButton = MAINMENUBUTTONS.find(obj => obj.id === 'menubutton-joingame');
  rooms: any[];
  constructor() {
  }

  setRooms(rooms: any[]) {
    this.rooms = rooms;
  }

  ngOnInit() {
  }

  onRoomSelected(room) {

  }


}
