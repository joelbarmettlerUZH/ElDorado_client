import {Room} from './Room';

export class User {
  userID: number;
  token: string;
  name: string;
  character: number;
  ready: boolean;
  roomEntity = Room;
  // from default/template
  public id: number;
  public status: string;
  public games: number;
  public moves: number;
  public username: string;

}
