import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Card} from '../models/Card';

@Injectable()
export class CardsService {

  private selectedCards: Card[] = [];
  private handCards: Card[] = [];

  constructor() {
  }

  public getSelectedCards(): Card[] {
    return this.selectedCards;
  }

  public getHandCards(): Card[] {
    return this.handCards;
  }

  public addSelectedCard(card: Card) {
    this.selectedCards.push(card);
  }

  public addHandCard(card: Card) {
    this.handCards.push(card);
  }

  public removeSelectedCard(card: Card) {
    const cards = this.selectedCards.filter(c => c !== card);
    this.setSelectedCards(cards);
  }

  public removeHandCard(card: Card) {
    const cards = this.handCards.filter(c => c !== card);
    this.removeSelectedCard(card);
    this.setHandCards(cards);
  }

  public setSelectedCards(cards: Card[]) {
    this.selectedCards = cards;
  }

  public setHandCards(cards: Card[]) {
    this.handCards = cards;
  }

}
