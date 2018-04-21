import {Component, OnInit} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';
import {RoomService} from '../../shared/services/room.service';
import {Subscription} from 'rxjs/Subscription';
import {Room} from '../../shared/models/Room';
import {User} from '../../shared/models/User';

@Component({
  selector: 'app-join-buttons',
  templateUrl: './join-buttons.component.html',
  styleUrls: ['./join-buttons.component.css']
})
export class JoinButtonsComponent implements OnInit {

  joinButton = MAINMENUBUTTONS.find(obj => obj.id === 'menubutton-joingame');
  rooms: Room[];
  public subscription: Subscription;

  constructor(private roomService: RoomService) {
  }

  setRooms(rooms: any[]) {
    this.rooms = rooms;
  }

  ngOnInit() {
    this.subscription = this.roomService.getAllRooms().subscribe(
      res => {
        this.rooms = res;
        console.log('res', res);
        console.log('log in Join butoons', this.rooms[0]);
      }
    );
  }

  onRoomSelected(room: Room) {
    const user: User = JSON.parse(localStorage.getItem('meUser'));
    console.log('got user from local storage:', user)
    this.roomService.addUser(user, room.id);
  }


}
