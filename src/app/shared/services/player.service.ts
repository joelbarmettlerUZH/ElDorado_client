import {Injectable} from '@angular/core';
import {restUrl} from './RESTurl';
import {Http, RequestOptions} from '@angular/http';
import {Card} from '../models/Card';
import {MoveWrapper} from '../models/MoveWrapper';
import {Slot} from '../models/Slot';
import {Blockade} from '../models/Blockade';

@Injectable()
export class PlayerService {

  private requestOptions = new RequestOptions({
    headers: null, withCredentials:
      false
  });

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
  this.playerId = Number(localStorage.getItem('playerId'));
  this.token = localStorage.getItem('token');
    return this.http.get(this.baseUrl + 'Player').map(res => res.json());
  }

  // Returns every player that is currently in any game
  public getPlayer(playerId: number) {
    this.playerId = Number(localStorage.getItem('playerId'));
    return this.http.get(this.baseUrl + 'Player/' + this.playerId).map(res => res.json());
  }

  // Returns playingPiece of isCurrent player
  public getPlayingPiece() {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.get(this.baseUrl + 'Player/' + this.playerId + '/PlayingPiece?token=' + this.token).map(res => res.json());
  }

  // Returns HandPile
  public getHandPile() {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.get(this.baseUrl + 'Player/' + this.playerId + '/HandPile?token=' + this.token).map(res => res.json());
  }

  // Sells the provided card and returns modified player
  public sell(card: Card) {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Sell?token=' + this.token, card).map(res => res.json());
  }

  // Buys one card from the slot and returns the modified player
  public buy(slot: Slot) {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Buy?token=' + this.token, slot).map(res => res.json());
  }

  // Removes a card from the handPile and returns the modified player
  public remove(card: Card) {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Remove?token=' + this.token, card).map(res => res.json());
  }

  // Discards a card from the handPile and returns the modified player
  public discard(card: Card) {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Discard?token=' + this.token, card).map(res => res.json());
  }

  // Steals a card from the handPile and returns the modified player
  public steal(slot: Slot) {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Steal?token=' + this.token, slot).map(res => res.json());
  }

  // Draws a new card from the drawpile
  public draw() {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Draw?token=' + this.token, '').map(res => res.json());
  }

  // Ends isCurrent round
  public endRound() {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/End?token=' + this.token, '').map(res => res.json());
  }

  // Ends current round
  public performAction(card: Card) {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Action?token=' + this.token, card).map(res => res.json());
  }

  // FindPath
  public findPath(moveWrapper: MoveWrapper, playingPieceId: number) {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Path/' + playingPieceId + '?token=' + this.token, moveWrapper).map(res => res.json());
  }

  // Move
  public move(moveWrapper: MoveWrapper, playingPieceId: number) {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Move/' + playingPieceId + '?token=' + this.token, moveWrapper).map(res => res.json());
  }

  // Remove blockadeEvent
  public removeBlockade(blockade: Blockade) {
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Blockade/?token=' + this.token, blockade).map(res => res.json());
  }

}
