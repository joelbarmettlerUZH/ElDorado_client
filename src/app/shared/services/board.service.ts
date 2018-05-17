import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {restUrl} from './RESTurl';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class BoardService {

  private baseUrl = restUrl.getBaseUrl();
  private listOfBoards = new BehaviorSubject([]);
  listBoards$ = this.listOfBoards.asObservable();

  constructor(private http: Http) {
  }

  // returns all routes
  public getAllBoards(start?: number, end?: number) {
    const url = this.baseUrl + 'Board?from=' + start + '&to=' + end;
    this.http.get(url).map(res => this.listBoards$ = res.json());
    console.log('service variable:', this.listBoards$);
    return this.http.get(url).map(res => this.listBoards$ = res.json());
  }
}
