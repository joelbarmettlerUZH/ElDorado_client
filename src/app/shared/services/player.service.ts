import { Injectable } from '@angular/core';
import {restUrl} from './RESTurl';
import {Http} from '@angular/http';
import {Card} from '../models/Card';
import {MoveWrapper} from '../models/MoveWrapper';
import {Slot} from '../models/Slot';

@Injectable()
export class PlayerService {

  private baseUrl = restUrl.getBaseUrl();
  private playersUrl = '${baseUrl}/Player';
  private playerUrl = '${baseUrl}/Player({$playerId}';
  private handPileUrl = '${baseUrl}/Player({$playerId}/HandPile?token=${token}';
  private playerActionUrl = '${baseUrl}/Player({$playerId}/${playerAction}?token=${token}';
  private moveUrl = '${baseUrl}/Player({$playerId}/${playerAction}/${playingPieceId}?token=${token}';

  constructor(private http: Http) { }

  //Returns every player that is currently in any game
  public getAllPlayers() {
    return this.http.get(this.playersUrl).map(res => res.json());
  }

  //Returns every player that is currently in any game
  public getPlayer(playerId: number) {
    return this.http.get(this.playerUrl).map(res => res.json());
  }

  //Returns playingPiece of current player
  public getPlayingPiece(playerId: number) {
    let token: string = "";
    let playerAction: string = "PlayingPiece";
    return this.http.get(this.playerActionUrl).map(res => res.json());
  }

  //Returns HandPile
  public getHandPile(playerId: number, token: string) {
    let playerAction: string = "PlayingPiece";
    return this.http.get(this.playerActionUrl).map(res => res.json());
  }

  //Sells the provided card and returns modified player
  public sell(card: Card, playerId: number, token: string) {
    let playerAction: string = "Sell";
    return this.http.put(this.playerActionUrl, card).map(res => res.json());
  }

  //Buys one card from the slot and returns the modified player
  public buy(slot: Slot, playerId: number, token: string) {
    let playerAction: string = "Buy";
    return this.http.put(this.playerActionUrl, slot).map(res => res.json());
  }

  //Removes a card from the handPile and returns the modified player
  public remove(card: Card, playerId: number, token: string) {
    let playerAction: string = "Remove";
    return this.http.put(this.playerActionUrl, card).map(res => res.json());
  }

  //Discards a card from the handPile and returns the modified player
  public discard(card: Card, playerId: number, token: string) {
    let playerAction: string = "Discard";
    return this.http.put(this.playerActionUrl, card).map(res => res.json());
  }

  //Removes a card from the handPile and returns the modified player
  public steal(slot: Slot, playerId: number, token: string) {
    let playerAction: string = "Steal";
    return this.http.put(this.playerActionUrl, slot).map(res => res.json());
  }

  //Ends current round
  public endRound(playerId: number, token: string) {
    let playerAction: string = "End";
    return this.http.put(this.playerActionUrl, "").map(res => res.json());
  }

  //Ends current round
  public performAction(actionCard: ActionCard, playerId: number, token: string) {
    let playerAction: string = "Action";
    return this.http.put(this.playerActionUrl, actionCard).map(res => res.json());
  }

  //FindPath
  public findPath(moveWrapper: MoveWrapper, playingPieceId: number, playerId: number, token: string) {
    let playerAction: string = "Path";
    return this.http.put(this.playerActionUrl, moveWrapper).map(res => res.json());
  }

  //Move
  public move(moveWrapper: MoveWrapper, playingPieceId: number, playerId: number, token: string) {
    let playerAction: string = "Move";
    return this.http.put(this.playerActionUrl, moveWrapper).map(res => res.json());
  }

}
