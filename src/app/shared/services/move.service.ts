import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Card} from '../models/Card';

@Injectable()
export class MoveService {

  private selectedCards: Card[] = [];

  constructor() {
  }

  public getCards(): Card[] {
    return this.selectedCards;
  }

  public addCard(card: Card) {
    this.selectedCards.push(card);
  }

  public removeCard(card: Card) {
    const cards = this.selectedCards.filter(c => c !== card);
    this.setCards(cards);
  }

  public setCards(cards: Card[]) {
    this.selectedCards = cards;
  }

}
