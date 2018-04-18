import {Point} from './point';

export class Hexspace {
  public strength: number;
  public minimalCost: number;
  public minimalDepth: number;
  public color: string;
  public point: Point;
  public previous: Hexspace[];
}
