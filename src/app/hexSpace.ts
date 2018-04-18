import {Point} from './point';

export class Hexspace {
  strength: number;
  minimalCost: number;
  minimalDepth: number;
  color: string;
  point: Point;
  previous: Hexspace[];
}
