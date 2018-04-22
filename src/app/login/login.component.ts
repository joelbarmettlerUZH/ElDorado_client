// import {Component, OnInit} from '@angular/core';
// import {AuthenticationService} from '../shared/services/authentication.service';
// import {Router} from '@angular/router';
// import {User} from '../shared/models/me';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   model: any = {};
//   loading = false;
//   error = '';
//   me: User;
//
//   constructor(private router: Router, private _service: AuthenticationService, private _router: Router) {
//
//   }
//
//   ngOnInit() {
//     // reset login status
//     this._service.logout();
//     this.me = new User();
//
//   }
//
//   login() {
//     this._service.login(this.me)
//       .subscribe(result => {
//         if (result) {
//           this.router.navigate(['/']);
//         } else {
//           this.error = 'Username exists';
//           this.loading = false;
//         }
//       });
//   }
//
//   clearfields() {
//     this.me.name = '';
//     this.me.username = '';
//   }
//
//
// }
