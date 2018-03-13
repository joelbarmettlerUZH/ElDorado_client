import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {
  private apiUrl: string;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {

    //TODO fill in your heroku-backend URL
    this.apiUrl = '';
  }

  getUsers(): Observable<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authenticationService.token})
    };
    // get users from api
    return this.http.get<User[]>(this.apiUrl + '/users', httpOptions);
  }
}

