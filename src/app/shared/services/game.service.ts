import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {restUrl} from './RESTurl';
import {Game} from '../models/Game';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Player} from '../models/Player';
import {Board} from '../models/board';
import {MarketPlace} from '../models/MarketPlace';
import {Blockade} from '../models/Blockade';


@Injectable()
export class GameService {

  private FREQUENCY = 1000;

  private baseUrl = restUrl.getBaseUrl();
  private game: Game;
  private gameSubscription: Subscription;
  public gameId = -1;

  // Important use Http (HttpModule) NOT HttpClient
  constructor(private http: Http) {
    this.gameSubscription = Observable.interval(this.FREQUENCY).subscribe(
      res => this.updateGame());
  }

  /*
  unsubscribeService() {
    this.gameSubscription.unsubscribe();
  }

  subscribeService() {
    this.gameSubscription = Observable.interval(this.FREQUENCY).subscribe(
      res => this.updateGame());
  }
*/

  rawGetter() {
    const gameId = Number(localStorage.getItem('gameId'));
    return this.http.get(this.baseUrl + 'Game/' + gameId).map(res => res.json());
  }

  updateGame() {
    console.log('Getting game ' + this.gameId);
    try {
      this.gameId = Number(localStorage.getItem('gameId'));
      this.http.get(this.baseUrl + 'Game/' + this.gameId).map(
        res => res.json()).subscribe(
        res => {
          this.game = res;
        },
        err => {
          console.log('Error in getting Game ', this.gameId);
        }
      );
    } catch (e) {
      console.log('Trying to request non-existing game');
    }
  }

  // gets game id
  public getGame(): Game {
    return this.game;
  }

  // Gets isCurrent player
  public getCurrent(): Player {
    return this.game.current;
  }

  // Gets all players
  public getPlayers(): Player[] {
    return this.game.players;
  }

  // Gets board
  public getBoard(): Board {// console.log(this.baseUrl)
    return this.game.pathMatrix;
  }

  // Gets Market
  public getMarket(): MarketPlace {
    return this.game.marketPlace;
  }

  // Gets blockades
  public getBlockades(): Blockade[] {
    return this.game.blockades;
  }

  // Gets winners
  public getWinners(): Player {
    return this.game.winners;
  }

  public isRunning(): boolean {
    return this.game.running;
  }
}
