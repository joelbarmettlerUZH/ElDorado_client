import { Injectable } from '@angular/core';
import {restUrl} from './RESTurl';
import {Http} from '@angular/http';
import {Card} from '../models/Card';
import {MoveWrapper} from '../models/MoveWrapper';
import {Slot} from '../models/Slot';
import {ActionCard} from '../models/ActionCard';
import {CookieHandler} from '../cookieHandler';

@Injectable()
export class PlayerService {

  private baseUrl = restUrl.getBaseUrl();
  // private playersUrl = '${baseUrl}/Player';
  // private playerUrl = '${baseUrl}/Player({$playerId}';
  // private handPileUrl = '${baseUrl}/Player({$playerId}/HandPile?token=${token}';
  // private playerActionUrl = '${baseUrl}/Player({$playerId}/${playerAction}?token=${token}';
  // private moveUrl = '${baseUrl}/Player({$playerId}/${playerAction}/${playingPieceId}?token=${token}';

  constructor(private http: Http) { }

  // Returns every player that is currently in any game
  public getAllPlayers() {
    return this.http.get(this.baseUrl + 'Player').map(res => res.json());
  }

  // Returns every player that is currently in any game
  public getPlayer(playerId: number) {
    return this.http.get(this.baseUrl + 'Player/' + playerId).map(res => res.json());
  }

  // Returns playingPiece of current player
  public getPlayingPiece() {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.get(this.baseUrl + 'Player/' + playerId + '/PlayingPiece?token=' + token).map(res => res.json());
  }

  // Returns HandPile
  public getHandPile() {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.get(this.baseUrl + 'Player/' + playerId + '/HandPile?token=' + token).map(res => res.json());
  }

  // Sells the provided card and returns modified player
  public sell(card: Card) {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.put(this.baseUrl + 'Player/' + playerId + '/Sell?token=' + token, card).map(res => res.json());
  }

  // Buys one card from the slot and returns the modified player
  public buy(slot: Slot) {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.put(this.baseUrl + 'Player/' + playerId + '/Buy?token=' + token, slot).map(res => res.json());
  }

  // Removes a card from the handPile and returns the modified player
  public remove(card: Card) {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.put(this.baseUrl + 'Player/' + playerId + '/Remove?token=' + token, card).map(res => res.json());
  }

  // Discards a card from the handPile and returns the modified player
  public discard(card: Card) {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.put(this.baseUrl + 'Player/' + playerId + '/Discard?token=' + token, card).map(res => res.json());
  }

  // Removes a card from the handPile and returns the modified player
  public steal(slot: Slot) {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.put(this.baseUrl + 'Player/' + playerId + '/Steal?token=' + token, slot).map(res => res.json());
  }

  // Ends current round
  public endRound() {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.put(this.baseUrl + 'Player/' + playerId + '/End?token=' + token, '').map(res => res.json());
  }

  // Ends current round
  public performAction(actionCard: ActionCard) {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.put(this.baseUrl + 'Player/' + playerId + '/Action?token=' + token, actionCard).map(res => res.json());
  }

  // FindPath
  public findPath(moveWrapper: MoveWrapper, playingPieceId: number) {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.put(this.baseUrl + 'Player/' + playerId + '/Path?token=' + token, moveWrapper).map(res => res.json());
  }

  // Move
  public move(moveWrapper: MoveWrapper, playingPieceId: number) {
    let playerId = CookieHandler.readId()
    let token = CookieHandler.readToken()
    return this.http.put(this.baseUrl + 'Player/' + playerId + '/Move?token=' + token, moveWrapper).map(res => res.json());
  }

}
