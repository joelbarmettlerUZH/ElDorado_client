import {Room} from './Room';

export class User {
  name: string;
  character: number;
  roomEntity = Room;
  ready: boolean;
  token: string;
}
