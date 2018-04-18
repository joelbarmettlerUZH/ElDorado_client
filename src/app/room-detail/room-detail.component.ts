import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Room } from '../shared/models/Room';
import {RoomService} from '../shared/services/room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  @Input() room: Room;
  constructor(  private route: ActivatedRoute,
                private roomService: RoomService,
                private location: Location) { }

  ngOnInit() {
    this.getRoom();
  }
  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => this.room = room);
  }
  goBack(): void {
    this.location.back();
  }
}
