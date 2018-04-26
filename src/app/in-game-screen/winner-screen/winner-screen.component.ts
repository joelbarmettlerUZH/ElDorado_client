import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {INTERVAL} from '../../shared/services/INTERVAL';

@Component({
  selector: 'app-winner-screen',
  templateUrl: './winner-screen.component.html',
  styleUrls: ['./winner-screen.component.css']
})
export class WinnerScreenComponent implements OnInit {
  @Input() winner: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goToMainScreen() {
    this.router.navigate(['/main-menu']);
  }
}





