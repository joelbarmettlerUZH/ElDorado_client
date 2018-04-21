import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Card} from '../models/Card';

@Injectable()
export class MoveService {

  private selectedCards = new BehaviorSubject<Card[]>([]);

  constructor() { }

  public getCards() {
    return this.selectedCards.asObservable();
  }

  public setCards(cards: Card[]) {
    this.selectedCards.next(cards);
  }

}
