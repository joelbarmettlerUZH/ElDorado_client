import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';
import {Board} from '../models/board';
import {Http, Response} from '@angular/http';
import {Hexspace} from '../models/hexSpace';
import {Card} from '../models/Card';
import {PlayingPiece} from '../models/PlayingPiece';
import {MoveWrapper} from '../models/MoveWrapper';
import {restUrl} from './RESTurl';

@Injectable()
export class BoardService {
  private baseUrl = restUrl.getBaseUrl();
  private boardUrl = '${baseUrl}Game/3/Board';  // URL to web api

  // Important use Http (HttpModule) NOT HttpClient
  constructor(private http: Http) {
  }

  // get x Dimension of the board Matrix
  /*
  async getxDim(): Promise<number> {
    const response = await this.http.get(this.boardUrl).toPromise();
    return response.json().xdim;
  }*/

  public getBoard(boardId: number) {
    const url = this.baseUrl + 'Game/' + boardId + '/Board';
    return this.http.get(url).map(res => res.json());
  }

  public getWay(moveWrapper: MoveWrapper, playingPieceId: number, playerId: number, token: String) {
    const url = this.baseUrl + 'Player/' + playerId + '/Path/' + playingPieceId + '?token=' + token;
    return this.http.post(url, moveWrapper).map(res => res.json());
  }

  public getHandpile(playerId: number, token: String) {
    const url = this.baseUrl + 'Player/' + playerId + '/HandPile?token=$' + token;
    return this.http.get(url).map(res => res.json());
  }

  /*
  private url: String = "heroku.com/api/v0/Game/${gameId}/Whatever/${playerId}?token=${token}"

public postCard(card: Card, gameId: number, playerId: number, token: String) {
   return this.http.post(this.url, card).map(res => res.json());
 }

//maybe you need JSON.stringify(card)
   */

  // public getWay(Card[]) {}

  // get y Dimension of the board Matrix
  /*
  async getyDim(): Promise<number> {
    const response = await this.http.get(this.boardUrl).toPromise();
    return response.json().ydim;
  }

  // get HexSpace Array of the board Matrix
  async getHexagons(): Promise<Hexspace[]> {
    const response = await this.http.get(this.boardUrl).toPromise();
    return response.json().matrixArray;
  }
*/
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
