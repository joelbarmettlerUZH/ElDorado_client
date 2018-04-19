import {Card} from './Card';
import {PlayingPiece} from './PlayingPiece';
import {Hexspace} from './hexSpace';

export class Memento {
  momentoId: number;
  reachables: Hexspace[];
  selectedCards: Card[];
  playingPiece: PlayingPiece;
}


/*
"memento": {
            "momentoId": 1,
            "reachables": [],
            "selectedCards": [],
            "playingPiece": null
 */
