import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  private elDoradoUrl = 'https://sopra-fs18-group17.herokuapp.com/api/v0/User';  // URL to web api
  constructor(private http: HttpClient) {
  }
}

// ToDo move to shared + Authentification as in the provided UserService!
