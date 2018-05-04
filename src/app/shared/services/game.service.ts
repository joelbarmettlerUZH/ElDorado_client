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
import {INTERVAL} from './INTERVAL';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class GameService {

  private FREQUENCY = INTERVAL.game();

  private baseUrl = restUrl.getBaseUrl();
  public game: Game;
  public gameSub: BehaviorSubject<Game> = new BehaviorSubject<Game>(this.game);
  public current: Player;
  public currentSub: BehaviorSubject<Player> = new BehaviorSubject<Player>(this.current);
  public players: Player[];
  public playersSub: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>(this.players);
  public market: MarketPlace;
  public marketSub: BehaviorSubject<MarketPlace> = new BehaviorSubject<MarketPlace>(this.market);
  public winners: Player;
  public winnersSub: BehaviorSubject<Player> = new BehaviorSubject<Player>(this.winners);
  public running: Boolean;
  public runningSub: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(this.running);
  private gameSubscription: Subscription;
  public gameId = -1;

  // Important use Http (HttpModule) NOT HttpClient
  constructor(private http: Http) {
    this.gameSubscription = Observable.interval(this.FREQUENCY).subscribe(
      res => this.updateGame());
  }

  rawGetter() {
    const gameId = Number(localStorage.getItem('gameId'));
    return this.http.get(this.baseUrl + 'Game/' + gameId).map(res => res.json());
  }

  updateGame() {
    // console.log('Getting game ' + this.gameId);
    try {
      this.gameId = Number(localStorage.getItem('gameId'));
      this.rawGetter().subscribe(
        res => {
          const tmpgame: Game = res;
          if (JSON.stringify(tmpgame) !== JSON.stringify(this.game)) {
            console.log('--Game Update: Received new game information');
            this.game = tmpgame;
            this.gameSub.next(this.game);
            try {
              if (JSON.stringify(this.game.marketPlace) !== JSON.stringify(this.market)) {
                console.log('--Game Update: Received new Market information');
                this.market = this.game.marketPlace;
                this.marketSub.next(this.market);
              }
              if (JSON.stringify(this.game.current) !== JSON.stringify(this.current)) {
                console.log('--Game Update: Received new Current information');
                this.current = this.game.current;
                this.currentSub.next(this.current);
              }
              if (JSON.stringify(this.game.players) !== JSON.stringify(this.players)) {
                console.log('--Game Update: Received new players information');
                this.players = this.game.players;
                this.playersSub.next(this.players);
              }
              if (JSON.stringify(this.game.winners) !== JSON.stringify(this.winners)) {
                console.log('--Game Update: Received new winners information');
                this.winners = this.game.winners;
                this.winnersSub.next(this.winners);
              }
              if (JSON.stringify(this.game.running) !== JSON.stringify(this.running)) {
                console.log('--Game Update: Received new winners information');
                this.running = this.game.running;
                this.runningSub.next(this.running);
              }
            } catch (e) {
              console.log('--Game Update: Could not fetch Market, Current or Players');
            }
          }
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
