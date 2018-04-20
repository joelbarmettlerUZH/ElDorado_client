import { Component, OnInit } from '@angular/core';
import { Room } from '../shared/models/Room';
import { RoomService } from '../shared/services/room.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any[];

  constructor(private roomService: RoomService,
              private location: Location) { }

  ngOnInit() {
    this.getRooms();
  }
  getRooms(): void {
    this.roomService.getAllRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
  goBack(): void {
    this.location.back();
  }
}

