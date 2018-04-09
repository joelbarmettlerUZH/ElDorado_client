import { Component, OnInit } from '@angular/core';
import { Room } from '../Room';
import { RoomService } from '../room.service';
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
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
  goBack(): void {
    this.location.back();
  }
}

