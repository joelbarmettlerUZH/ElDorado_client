import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Card} from '../models/Card';

@Injectable()
export class CardsService {

  private selectedCards: Card[] = [];
  public selectedardsSub: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(this.selectedCards);
  private handCards: Card[] = [];
  public handCardsSub: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(this.handCards);

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
    this.selectedardsSub.next(this.selectedCards);
  }

  public addHandCard(card: Card) {
    this.handCards.push(card);
    this.handCardsSub.next(this.handCards);
  }

  public removeSelectedCard(card: Card) {
    const cards = this.selectedCards.filter(c => c !== card);
    this.setSelectedCards(cards);
    this.selectedardsSub.next(this.selectedCards);
  }

  public removeHandCard(card: Card) {
    const cards = this.handCards.filter(c => c !== card);
    this.removeSelectedCard(card);
    this.setHandCards(cards);
    this.handCardsSub.next(this.handCards);
  }

  public setSelectedCards(cards: Card[]) {
    this.selectedCards = cards;
    this.selectedardsSub.next(this.selectedCards);
  }

  public setHandCards(cards: Card[]) {
    this.handCards = cards;
    this.handCardsSub.next(this.handCards);
  }

}
