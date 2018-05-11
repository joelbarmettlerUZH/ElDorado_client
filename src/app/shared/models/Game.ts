import {Point} from './point';
import {Player} from './Player';
import {Hexspace} from './hexSpace';
import {Board} from './board';
import {Blockade} from './Blockade';
import {MarketPlace} from './MarketPlace';
import {Memento} from './Memento';

export class Game {
  public gameId: number;
  public boardId: number;
  public current: Player;
  public startingSpaces: Hexspace[];
  public currentPlayerNumber: number;
  public running: boolean;
  public pathMatrix: Board;
  public players: Player[];
  public winners: Player;
  public blockades: Blockade[];
  public marketPlace: MarketPlace;
  public memento: Memento;
  public gameName: String;
}
