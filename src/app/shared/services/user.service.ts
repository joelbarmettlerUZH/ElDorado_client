import { Injectable } from '@angular/core';
import {restUrl} from './RESTurl';
import {Http} from '@angular/http';
import {CreateUser} from '../models/createUser';
import {User} from '../models/User';

@Injectable()
export class UserService {

  private baseUrl = restUrl.getBaseUrl();
  private usersUrl = '${baseUrl}/User?token=${token}';
  private userUrl = '${baseUrl}/User/${userId}';

  constructor(private http: Http) { }

  public getAllUsers() {
    let token: string = "";
    return this.http.get(this.usersUrl).map(res => res.json());
  }

  // Return all users from any game
  public getUser(userId: number, token: string){
    return this.http.get(this.userUrl).map(res => res.json());
  }

  // Creates and returns a new user according to values in CreateUser
  public createUser(createUser: CreateUser, token: string){
    return this.http.post(this.usersUrl, createUser).map(res => res.json());
  }

  // Modifies an existing user
  public modifyUser(user: User, token: string){
    return this.http.put(this.usersUrl, user).map(res => res.json());
  }

}
