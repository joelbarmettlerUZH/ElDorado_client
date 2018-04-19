import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {restUrl} from './RESTurl';
import {Http} from '@angular/http';
import {CreateRoom} from '../models/createRoom';
import {User} from '../models/User';

@Injectable()
export class RoomService {

  private baseUrl = restUrl.getBaseUrl();
  private roomsUrl = "${baseUrl}/Room";
  private roomUrl = "${baseUrl}/Room/${roomid}";
  constructor(private http: Http) { }

  // returns all rooms
  public getAllRooms() {
    return this.http.get(this.roomsUrl).map(res => res.json());
  }

  // Returns a specific room with id roomId
  public getRoom(roomId: number){
    return this.http.get(this.roomUrl).map(res => res.json());
  }

  // Creates a new room with the createRoom properties, returns the newly created room
  public createRoom(createRoom: CreateRoom){
    return this.http.post(this.roomsUrl, createRoom).map(res => res.json());
  }

  //adds a user to a room and returns the modified room
  public addUser(user: User, gameId: number){
    return this.http.put(this.roomUrl, user).map(res => res.json());
  }

}
