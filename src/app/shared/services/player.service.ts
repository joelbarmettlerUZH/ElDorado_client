import {Injectable} from '@angular/core';
import {restUrl} from './RESTurl';
import {Http, RequestOptions} from '@angular/http';
import {Card} from '../models/Card';
import {MoveWrapper} from '../models/MoveWrapper';
import {Slot} from '../models/Slot';
import {Blockade} from '../models/Blockade';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Player} from '../models/Player';
import {GameService} from './game.service';
import {PlayingPiece} from '../models/PlayingPiece';

@Injectable()
export class PlayerService {

  private FREQUENCY = 300;

  private baseUrl = restUrl.getBaseUrl();
  private playerSubscription: Subscription;
  private players: Player[];
  private ownPlayer: Player;

  public playerId = Number(localStorage.getItem('palyerId'));
  public gameId = Number(localStorage.getItem('gameId'));
  public token = localStorage.getItem('token');

  constructor(private http: Http, gameService: GameService) {
    this.playerSubscription = Observable.interval(this.FREQUENCY).subscribe(
      res => this.players = gameService.getPlayers()
    );
  }

  // Returns every player that is currently in any game
  public getPlayer(playerId: number = this.playerId): Player {
    this.players.forEach(
      player => {
        if (player.playerId === playerId) {
          return player;
        }
      }
    );
    return null;
  }

  // Returns playingPiece of isCurrent player
  public getPlayingPiece(): PlayingPiece[] {
    return this.getPlayer().playingPieces;
  }

  // Returns HandPile
  public getHandPile(): Card[] {
    return this.getPlayer().handPile;
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

  // Steals a card from the handPile and returns the modified player
  public steal(slot: Slot) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Steal?token=' + this.token, slot).map(res => res.json());
  }

  // Draws a new card from the drawpile
  public draw() {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Draw?token=' + this.token, '').map(res => res.json());
  }

  // Ends isCurrent round
  public endRound() {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/End?token=' + this.token, '').map(res => res.json());
  }

  // Ends current round
  public performAction(card: Card) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Action?token=' + this.token, card).map(res => res.json());
  }

  // FindPath
  public findPath(moveWrapper: MoveWrapper, playingPieceId: number) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Path/' + playingPieceId + '?token=' + this.token, moveWrapper).map(res => res.json());
  }

  // Move
  public move(moveWrapper: MoveWrapper, playingPieceId: number) {
    return this.http.put(
      this.baseUrl + 'Player/' + this.playerId + '/Move/' + playingPieceId + '?token=' + this.token, moveWrapper).map(res => res.json());
  }

  // Remove blockadeEvent
  public removeBlockade(blockade: Blockade) {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Blockade/?token=' + this.token, blockade).map(res => res.json());
  }

}
