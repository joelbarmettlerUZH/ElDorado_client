import {Injectable} from '@angular/core';
import {restUrl} from './RESTurl';
import {Http} from '@angular/http';
import {Card} from '../models/Card';
import {MoveWrapper} from '../models/MoveWrapper';
import {Slot} from '../models/Slot';
import {ActionCard} from '../models/ActionCard';
import {RequestOptions, Request, Headers } from '@angular/http';

@Injectable()
export class PlayerService {

  private requestOptions = new RequestOptions({ headers:null, withCredentials:
      false });

  private baseUrl = restUrl.getBaseUrl();
  // private playersUrl = '${baseUrl}/Player';
  // private playerUrl = '${baseUrl}/Player({$playerId}';
  // private handPileUrl = '${baseUrl}/Player({$playerId}/HandPile?token=${token}';
  // private playerActionUrl = '${baseUrl}/Player({$playerId}/${playerAction}?token=${token}';
  // private moveUrl = '${baseUrl}/Player({$playerId}/${playerAction}/${playingPieceId}?token=${token}';

  private playerId = Number(localStorage.getItem('playerId'));
  private token = localStorage.getItem('token');

  // private playerId = 1;
  // private token = 'TESTTOKEN';

    constructor(private http: Http) {
  }

  // Returns every player that is currently in any game
  public getAllPlayers() {
    return this.http.get(this.baseUrl + 'Player').map(res => res.json());
  }

  // Returns every player that is currently in any game
  public getPlayer(playerId: number) {
    return this.http.get(this.baseUrl + 'Player/' + this.playerId).map(res => res.json());
  }

  // Returns playingPiece of current player
  public getPlayingPiece() {
    return this.http.get(this.baseUrl + 'Player/' + this.playerId + '/PlayingPiece?token=' + this.token).map(res => res.json());
  }

  // Returns HandPile
  public getHandPile() {
    // console.log("Getting Handpile...");
    return this.http.get(this.baseUrl + 'Player/' + this.playerId + '/HandPile?token=' + this.token).map(res => res.json());
  }

  // Sells the provided card and returns modified player
  public sell(card: Card) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Sell?token=' + this.token, card).map(res => res.json());
  }

  // Buys one card from the slot and returns the modified player
  public buy(slot: Slot) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Buy?token=' + this.token, slot).map(res => res.json());
  }

  // Removes a card from the handPile and returns the modified player
  public remove(card: Card) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Remove?token=' + this.token, card).map(res => res.json());
  }

  // Discards a card from the handPile and returns the modified player
  public discard(card: Card) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Discard?token=' + this.token, card).map(res => res.json());
  }

  // Removes a card from the handPile and returns the modified player
  public steal(slot: Slot) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Steal?token=' + this.token, slot).map(res => res.json());
  }

  // Ends current round
  public endRound() {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/End?token=' + this.token, '').map(res => res.json());
  }

  // Ends current round
  public performAction(actionCard: ActionCard) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Action?token=' + this.token, actionCard).map(res => res.json());
  }

  // FindPath
  public findPath(moveWrapper: MoveWrapper, playingPieceId: number) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Path?token=' + this.token, moveWrapper).map(res => res.json());
  }

  // Move
  public move(moveWrapper: MoveWrapper, playingPieceId: number) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Move?token=' + this.token, moveWrapper).map(res => res.json());
  }

}
