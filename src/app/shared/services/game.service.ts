import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {restUrl} from './RESTurl';


@Injectable()
export class GameService {

  // Important use Http (HttpModule) NOT HttpClient
  constructor(private http: Http) {
  }

  private baseUrl = restUrl.getBaseUrl();

  // gets all games
  public getGames() {
    return this.http.get(this.baseUrl + 'Game').map(res => res.json());
  }

  // gets game id
  public getGame() {
    const gameId = Number(localStorage.getItem('gameId'));
    return this.http.get(this.baseUrl + 'Game/' + gameId).map(res => res.json());
  }

  // Gets isCurrent player
  public getCurrent() {
    const gameId = Number(localStorage.getItem('gameId'));
    return this.http.get(this.baseUrl + 'Game/' + gameId + '/Current').map(res => res.json());
  }

  // Gets all players
  public getPlayers() {
    const gameId = Number(localStorage.getItem('gameId'));
    return this.http.get(this.baseUrl + 'Game/' + gameId + '/Players').map(res => res.json());
  }

  // Gets board
  public getBoard() {// console.log(this.baseUrl)
    const gameId = Number(localStorage.getItem('gameId'));
    return this.http.get(this.baseUrl + 'Game/' + gameId + '/Board').map(res => res.json());
  }

  // Gets Market
  public getMarket() {
    const gameId = Number(localStorage.getItem('gameId'));
    return this.http.get(this.baseUrl + 'Game/' + gameId + '/Market').map(res => res.json());
  }

  // Gets blockades
  public getBlockades() {
    const gameId = Number(localStorage.getItem('gameId'));
    return this.http.get(this.baseUrl + 'Game/' + gameId + '/Blockade').map(res => res.json());
  }

  // Gets winners
  public getWinners() {
    const gameId = Number(localStorage.getItem('gameId'));
    return this.http.get(this.baseUrl + 'Game/' + gameId + '/Winner').map(res => res.json());
  }
}
