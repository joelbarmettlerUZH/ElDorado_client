import {Injectable} from '@angular/core';
import {restUrl} from './RESTurl';
import {Http} from '@angular/http';
import {CreateUser} from '../models/createUser';
import {User} from '../models/User';


@Injectable()
export class UserService {

  private baseUrl = restUrl.getBaseUrl();

  private token = localStorage.getItem('token');

  constructor(private http: Http) { }

  public getAllUsers() {
    const url = this.baseUrl + 'User';
    return this.http.get(url).map(res => res.json());
  }

  // Return a specific me
  public getUser(userId: number) {
    const url = this.baseUrl + 'User/' + userId;
    return this.http.get(url).map(res => res.json());
  }

  // Creates and returns a new me according to values in CreateUser
  public createUser(createUser: CreateUser) {
    // TODO: Create check whether lcoal storage is already filled, if so delete old me
    const url = this.baseUrl + 'User';
    return this.http.post(url, createUser).map(res => res.json());
  }

  // Modifies an existing me
  public modifyUser(user: User) {
    const url = this.baseUrl + 'User?token=' + this.token;
    return this.http.put(url, user);
  }

}
