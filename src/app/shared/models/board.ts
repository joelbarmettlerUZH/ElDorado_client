import {Hexspace} from './hexSpace';
import {observable} from 'rxjs/symbol/observable';

export class Board {
  public boardMatrix: Hexspace[];
  public xdim: number;
  public ydim: number;
}
