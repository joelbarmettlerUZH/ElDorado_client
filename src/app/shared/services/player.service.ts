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
import {Game} from '../models/Game';
import {INTERVAL} from './INTERVAL';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SpecialAction} from '../models/SpecialAction';

@Injectable()
export class PlayerService {

  private FREQUENCY = INTERVAL.player();

  private baseUrl = restUrl.getBaseUrl();
  private playerSubscription: Subscription;
  private player: Player;
  public playerSub: BehaviorSubject<Player> = new BehaviorSubject<Player>(this.player);
  public handcard: Card[] = [];
  public playerHandcardSub: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(this.handcard);
  public specialAction: SpecialAction;
  public specialActionSub: BehaviorSubject<SpecialAction> = new BehaviorSubject<SpecialAction>(this.specialAction);
  public coins: number;
  public coinsSub: BehaviorSubject<number> = new BehaviorSubject<number>(this.coins);
  public removableBlockades: number[];
  public removableBlockadesSub: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(this.removableBlockades);
  public playerId = -1;
  public gameId = -1;
  public token = localStorage.getItem('token');

  constructor(private http: Http, private gameService: GameService) {
    this.playerSubscription = Observable.interval(this.FREQUENCY).subscribe(res => this.updatePlayer());
  }

  updatePlayer() {
    this.gameId = Number(localStorage.getItem('gameId'));
    this.playerId = Number(localStorage.getItem('playerId'));
    this.token = localStorage.getItem('token');
    try {
      // console.log('--Player Update: Fetching new player information');
      const tmpPlayer: Player = this.gameService.getPlayers().filter(player => player.playerId === this.playerId)[0];
      if (JSON.stringify(tmpPlayer) !== JSON.stringify(this.player)) {
        console.log('--Player Update: Player information received');
        this.player = tmpPlayer;
        this.playerSub.next(this.player);
        try {
          if (JSON.stringify(this.handcard) !== JSON.stringify(this.player.handPile)) {
            console.log('--Player Update: New handards received');
            this.handcard = this.player.handPile;
            this.playerHandcardSub.next(this.handcard);
          }
          if (JSON.stringify(this.specialAction) !== JSON.stringify(this.player.specialAction)) {
            console.log('--Player Update: New specialAction received');
            this.specialAction = this.player.specialAction;
            this.specialActionSub.next(this.specialAction);
          }
          if (JSON.stringify(this.coins) !== JSON.stringify(this.player.coins)) {
            console.log('--Player Update: New Coins received');
            this.coins = this.player.coins;
            this.coinsSub.next(this.coins);
          }
          if (JSON.stringify(this.removableBlockades) !== JSON.stringify(this.player.removableBlockades)) {
            console.log('--Player Update: New removable Blockades received');
            this.removableBlockades = this.player.removableBlockades;
            this.removableBlockadesSub.next(this.removableBlockades);
          }
        } catch (e) {
          console.log('--Player Update: ERROR, no player available yet');
        }
      }
    } catch (e) {
      console.log('--Player Update: ERROR, no players in game yet');
      this.player = null;
    }
  }

  rawGetter() {
    const playerId = Number(localStorage.getItem('playerId'));
    return this.http.get(this.baseUrl + 'Player/' + playerId).map(res => res.json());
  }

  // Returns every player that is currently in any game
  public getPlayer(): Player {
    // console.log('Requesting players of game');
    return this.player;
  }

  // Returns playingPiece of isCurrent player
  public getPlayingPiece(): PlayingPiece[] {
    return this.player.playingPieces;
  }

  // Returns HandPile
  public getHandPile(): Card[] {
    return this.player.handPile;
  }

  // Sells the provided card and returns modified player
  public sell(card: Card) {
    console.log("sell service")
    console.log(this.playerId);
    console.log(this.token);

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
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/Path/' + playingPieceId + '?token=' + this.token,
      moveWrapper).map(res => res.json());
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

  // Resets action budget
  public resetSpecialActions() {
    return this.http.put(this.baseUrl + 'Player/' + this.playerId + '/EndAction/?token=' + this.token, '').map(res => res.json());
  }

}
