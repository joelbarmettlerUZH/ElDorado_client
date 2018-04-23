import {Injectable} from '@angular/core';
import {restUrl} from './RESTurl';
import {Http} from '@angular/http';
import {CreateRoom} from '../models/createRoom';
import {User} from '../models/User';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Room} from '../models/Room';
import 'rxjs/add/operator/map'

@Injectable()
export class RoomService {

  private baseUrl = restUrl.getBaseUrl();
  constructor(private http: Http) { }
  private listRooms: Room[] = [];
  private listOfRooms = new BehaviorSubject([]);
  listRooms$ = this.listOfRooms.asObservable();
  private token = localStorage.getItem('token');


  // returns all rooms
  public getAllRooms() {
    const url = this.baseUrl + 'Room';
    this.http.get(url).map(res => this.listRooms$ = res.json());
    console.log('service variable:', this.listRooms$);
    return this.http.get(url).map(res => this.listRooms$ = res.json());
  }

  // Returns a specific room with id roomId
  public getRoom(roomId: number) {
    const url = this.baseUrl + 'Room/' + roomId;
    return this.http.get(url).map(res => res.json());
  }

  // Creates a new room with the createRoom properties, returns the newly created room
  public createRoom(roomName: string, boardNumber: number) {
    const url = this.baseUrl + 'Room';
    let createNewRoom: CreateRoom = new CreateRoom(roomName, boardNumber);
    console.log(createNewRoom);
    return this.http.post(url, createNewRoom).map(res => this.listRooms = res.json());
  }

  public updateUser(user: User, roomId: number) {
    const url = this.baseUrl + 'Room/' + roomId + '?token=' + this.token;
    console.log('service me addtoroom:', user);
    return this.http.put(url, user).map(res => {res.json();
      console.log('...', res.json());
    });
  }


  // adds a me to a room and returns the modified room
  public addUser(user: User, roomId: number) {
    const url = this.baseUrl + 'Room/' + roomId + '?token=' + this.token;
    console.log('service me addtoroom:', user);
    console.log('TOKEN me addtoroom:', this.token);
    return this.http.put(url, user).map(res => {res.json();
    console.log('...', res.json());
    });
  }

  // adds a me to a room and returns the modified room with token
  public addUserWithToken(user: User, roomId: number, token: string) {
    const url = this.baseUrl + 'Room/' + roomId + '?token=' + token;
    console.log('service me addtoroom:', user);
    console.log('TOKEN me addtoroom:', token);
    return this.http.put(url, user).map(res => {res.json();
      console.log('...', res.json());
    });
  }


}
