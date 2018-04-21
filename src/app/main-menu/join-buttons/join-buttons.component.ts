import {Component, OnInit} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';
import {RoomService} from '../../shared/services/room.service';
import {Subscription} from 'rxjs/Subscription';
import {Room} from '../../shared/models/Room';
import {User} from '../../shared/models/User';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-join-buttons',
  templateUrl: './join-buttons.component.html',
  styleUrls: ['./join-buttons.component.css']
})
export class JoinButtonsComponent implements OnInit {

  joinButton = MAINMENUBUTTONS.find(obj => obj.id === 'menubutton-joingame');
  rooms: Room[];
  public subscription: Subscription;
  public user: User;

  constructor(private roomService: RoomService,
              private userService: UserService) {
  }

  setRooms(rooms: any[]) {
    this.rooms = rooms;
  }

  ngOnInit() {
    this.subscription = this.roomService.getAllRooms().subscribe(
      res => {
        this.rooms = res;
        console.log('res', res);
        // console.log('log in Join butoons', this.rooms[0]);
      }
    );
  }

  onRoomSelected(room: Room) {
    // console.log(Number(localStorage.getItem('userId')));
    console.log('User form local storage', JSON.parse(localStorage.getItem('meUser')))
    this.user = JSON.parse(localStorage.getItem('meUser'));
    console.log('onselectuser', this.user);
    console.log('onselectroomsid', room.roomID);
    this.roomService.addUser(this.user, room.roomID).subscribe(response => {
        console.log('shfakjh', response);
    });
    // const user: User = JSON.parse(localStorage.getItem('meUser'));
  }


}
