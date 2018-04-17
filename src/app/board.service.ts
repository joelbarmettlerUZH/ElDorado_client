import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';

@Injectable()
export class BoardService {

  private boardUrl = 'https://sopra-fs18-group17.herokuapp.com/api/v0/Game/3/Board';  // URL to web api
  xDim: number;
  constructor(private http: HttpClient) {
  }

  getHexagons(): Observable<any[]> {
    return this.http.get<any[]>(this.boardUrl)
      .pipe(
        catchError(this.handleError('getBoard', []))
      );
  }

  /*
  getBoard(): number {
    this.http.get(this.boardUrl, {responseType: 'json'}).subscribe(res => {this.xDim = res['xDim'];
      }
    );
    return this.xDim;
  }
  */
  getBoard(): Observable<any[]> {
    return this.http.get<any>(this.boardUrl)
      .pipe(catchError(this.handleError()));
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
