import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {RoomService} from '../shared/services/room.service';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../shared/models/Room';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  @Input() room: Room;
  constructor(  private route: ActivatedRoute,
                private roomService: RoomService,
                private location: Location) { }

  ngOnInit() {
  }
  goBack(): void {
    this.location.back();
  }
}
