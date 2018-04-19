import { Injectable } from '@angular/core';
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
    return this.http.get('${baseUrl}Game').map(res => res.json());
  }

  // gets game id
  public getGame(gameId: number) {
    return this.http.get('${baseUrl}Game/${gameId}').map(res => res.json());
  }

  // Gets current player
  public getCurrent(gameId: number) {
    return this.http.get('${baseUrl}Game/${gameId}/Current').map(res => res.json());
  }

  // Gets all players
  public getPlayers(gameId: number) {
    return this.http.get('${baseUrl}Game/${gameId}/Players').map(res => res.json());
  }

  // Gets board
  public getBoard(gameId: number) {
    return this.http.get('${baseUrl}Game/${gameId}/Board').map(res => res.json());
  }

  // Gets Market
  public getMarket(gameId: number) {
    return this.http.get('${baseUrl}Game/${gameId}/Market').map(res => res.json());
  }

  // Gets blockades
  public getBlockades(gameId: number) {
    return this.http.get('${baseUrl}Game/${gameId}/Blockade').map(res => res.json());
  }

  // Gets winners
  public getWinners(gameId: number) {
    return this.http.get('${baseUrl}Game/${gameId}/Winner').map(res => res.json());
  }
}
