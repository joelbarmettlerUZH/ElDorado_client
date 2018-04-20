import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Player} from './player'; //TODO check if necessary
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class PlayerService {

  private elDoradoUrl = 'https://sopra-fs18-group17.herokuapp.com/api/v0/Player';  // URL to web api
  constructor(private http: HttpClient) {
  }

  getPlayers(): Observable<any[]> {
    console.log(this.http.get<any[]>(this.elDoradoUrl));
    return this.http.get<any[]>(this.elDoradoUrl)
      .pipe(
        catchError(this.handleError('getPlayers', []))
      );
  }

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
