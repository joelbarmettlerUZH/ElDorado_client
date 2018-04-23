// import {Card} from './Card';
import {Hexspace} from './hexSpace';

export class PlayingPiece {
  playingPieceId: number;
  standsOn: Hexspace;


  constructor(playingPieceId: number, standsOn: Hexspace) {
    this.playingPieceId = playingPieceId;
    this.standsOn = standsOn;
  }


}




/*
"playingPieceId": 0,
"standsOn": {
  "hexSpaceId": 709,
  "strength": 1000,
  "minimalCost": 1000,
  "minimalDepth": 0,
  "color": "STARTFIELD",
  "point": {
    "x": 1,
    "y": 2
  }
}
 */
