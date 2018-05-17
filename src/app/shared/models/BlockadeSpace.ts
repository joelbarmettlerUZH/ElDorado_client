import {Hexspace} from './hexSpace';
import {Point} from './point';

export class BlockadeSpace extends Hexspace {
  public hexSpaceId: number
  public strength: number;
  public minimalCost: number;
  public minimalDepth: number;
  public color: string;
  public point: Point;
  public parentBlockade: number;
  public orientation: number;
}


/*
"spaces": [
                    {
                        "hexSpaceId": 1,
                        "strength": 1,
                        "minimalCost": 1000,
                        "minimalDepth": 0,
                        "color": "RIVER",
                        "point": {
                            "x": 5,
                            "y": 7
                        },
                        "parentBlockade": 0
                    },
 */
