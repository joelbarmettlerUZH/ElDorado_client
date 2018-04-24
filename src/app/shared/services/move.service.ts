import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Card} from '../models/Card';

@Injectable()
export class MoveService {

  private selectedCards = new BehaviorSubject<Card[]>([]);

  constructor() {
  }

  public getCards(): Card[] {
    return this.selectedCards.getValue();
  }

  public addCard(card: Card) {
    this.selectedCards.getValue().push(card);
  }

  public removeCard(card: Card) {
    const cards = this.selectedCards.getValue().filter(c => c !== card);
    this.setCards(cards);
  }

  public setCards(cards: Card[]) {
    this.selectedCards.next(cards);
  }

}
