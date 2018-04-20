import { Injectable } from '@angular/core';
import {restUrl} from './RESTurl';
import {Http} from '@angular/http';
import {CreateUser} from '../models/createUser';
import {User} from '../models/User';
import {CookieHandler} from '../cookieHandler';

@Injectable()
export class UserService {

  private baseUrl = restUrl.getBaseUrl();
  private userUrl = '${baseUrl}/User/${userId}';

  constructor(private http: Http) { }

  public getAllUsers() {
    const url = this.baseUrl + 'User';
    return this.http.get(url).map(res => res.json());
  }

  // Return a specific user
  public getUser(userId: number){
    const url = this.baseUrl + 'User/' + userId;
    return this.http.get(url).map(res => res.json());
  }

  // Creates and returns a new user according to values in CreateUser
  public createUser(createUser: CreateUser){
    //TODO: Create check whether lcoal storage is already filled, if so delete old user
    const url = this.baseUrl + 'User';
    return this.http.post(url, createUser).map(res => res.json());
  }

  // Modifies an existing user
  public modifyUser(user: User){
    const token = CookieHandler.readToken();
    const url = this.baseUrl + 'User?token' + token;
    return this.http.put(url, user).map(res => res.json());
  }

}
