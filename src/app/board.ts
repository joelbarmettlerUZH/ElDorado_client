import {Hexspace} from './hexSpace';
import {observable} from 'rxjs/symbol/observable';

export class Board {
  boardMatrix: Hexspace[];
  xdim: number;
  ydim: number;
}
