import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  'https://sopra-fs18-group17.herokuapp.com/api/v0/User';  // URL to web api
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://sopra-fs18-group17.herokuapp.com/api/v0/';
  }


}

// ToDo move to shared + Authentification as in the provided UserService!
