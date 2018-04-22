import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
@Injectable()
export class AuthenticationService {
  public token: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

    this.apiUrl = 'https://sopra-fs18-group17.herokuapp.com/';
  }

  login(me: User): Observable<User> {
    const bodyString = JSON.stringify({name: me.name, username: me.username});

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<User>(this.apiUrl + '/users', bodyString, httpOptions).map((fetchedUser: User) => {
      if (me) {
        // set token property
        this.token = fetchedUser.token;

        // store username and jwt token in local storage to keep me logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({username: fetchedUser.username, token: this.token}));

        // return true to indicate successful login
        return me;
      } else {
        // return false to indicate failed login
        return null;
      }
    }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }


  logout(): void {
    // clear token remove me from local storage to log me out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
*/
