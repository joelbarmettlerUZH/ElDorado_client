import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Room} from './room';
import {ROOMS} from './mock-rooms';

@Injectable()
export class RoomService {

  constructor() {
  }

  getRooms(): Observable<Room[]> {
    return of(ROOMS);
  }

  getRoom(name: string): Observable<Room> {
    return of(ROOMS.find(room => room.name === name));
  }
}
