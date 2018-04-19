import {Point} from './point';

export class Hexspace {
  public hexSpaceId: number;
  public strength: number;
  public minimalCost: number;
  public minimalDepth: number;
  public color: string;
  public point: Point;


  constructor(hexSpaceId: number, strength: number,
              minimalCost: number, minimalDepth: number,
              color: string, point: Point) {
    this.hexSpaceId = hexSpaceId;
    this.strength = strength;
    this.minimalCost = minimalCost;
    this.minimalDepth = minimalDepth;
    this.color = color;
    this.point = point;
  }
}
