import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Room} from './room';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class RoomService {

  private elDoradoUrl = 'https://sopra-fs18-group17.herokuapp.com/api/v0/Room';  // URL to web api
  constructor(private http: HttpClient) {
  }

  /** POST: get all rooms from the server */
  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.elDoradoUrl)
      .pipe(
        catchError(this.handleError('getRooms', []))
      );
  }

  /** POST: add a new room to the server */
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.elDoradoUrl, room)
      .pipe(
        catchError(this.handleError<Room>('addRoom'))
      );
  }

  /** GET room by id. Will 404 if id not found */
  getRoom(id: number): Observable<Room> {
    const url = `${this.elDoradoUrl}/${id}`;
    return this.http.get<Room>(url).pipe(
      catchError(this.handleError<Room>(`getRoom id=${id}`))
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

// ToDo move to shared


