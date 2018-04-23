import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Card} from '../models/Card';

@Injectable()
export class HandcardService {

  private handCards = new BehaviorSubject<Card[]>([]);

  constructor() { }

  public getCards() {
    return this.handCards.asObservable();
  }

  public addCard(card: Card) {
    this.handCards.getValue().push(card);
  }

  public removeCard(card: Card) {
    const cards = this.handCards.getValue().filter(c => c !== card);
    this.setCards(cards);
  }

  public setCards(cards: Card[]) {
    this.handCards.next(cards);
  }

}
