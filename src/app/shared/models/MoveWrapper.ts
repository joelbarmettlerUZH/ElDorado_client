import {Card} from './Card';
import {Hexspace} from './hexSpace';

export class MoveWrapper {
  cards: Card[];
  hexSpace: Hexspace;

  constructor(cards: Card[], hexSpace: Hexspace) {
    this.cards = cards;
    this.hexSpace = hexSpace;
  }
}

/*
public class MoveWrapper {
    public List<Card> cards;
    public HexSpace hexSpace;
}

 */
