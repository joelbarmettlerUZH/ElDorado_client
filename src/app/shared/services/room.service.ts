import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {restUrl} from './RESTurl';
import {Http} from '@angular/http';
import {CreateRoom} from '../models/createRoom';
import {User} from '../models/User';

@Injectable()
export class RoomService {

  private baseUrl = restUrl.getBaseUrl();
  constructor(private http: Http) { }

  // returns all rooms
  public getAllRooms() {
    const url = this.baseUrl + 'Room';
    return this.http.get(url).map(res => res.json());
  }

  // Returns a specific room with id roomId
  public getRoom(roomId: number){
    const url = this.baseUrl + 'Room/' + roomId;
    return this.http.get(url).map(res => res.json());
  }

  // Creates a new room with the createRoom properties, returns the newly created room
  public createRoom(roomName: string, boardNumber: number){
    const url = this.baseUrl + 'Room';
    let createNewRoom: CreateRoom = new CreateRoom(roomName, boardNumber);
    return this.http.post(url, createNewRoom).map(res => res.json());
  }

  // adds a user to a room and returns the modified room
  public addUser(user: User, roomId: number){
    const url = this.baseUrl + 'Room/' + roomId;
    return this.http.put(url, user).map(res => res.json());
  }

}
