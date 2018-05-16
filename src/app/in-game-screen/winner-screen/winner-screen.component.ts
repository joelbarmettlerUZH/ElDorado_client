import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {INTERVAL} from '../../shared/services/INTERVAL';
import {SoundService} from '../../shared/services/sound.service';
import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-winner-screen',
  templateUrl: './winner-screen.component.html',
  styleUrls: ['./winner-screen.component.css']
})
export class WinnerScreenComponent implements OnInit {
  @Input() winner: Player;

  constructor(private router: Router, private sound: SoundService) {
  }

  ngOnInit() {
  }

  goToMainScreen() {
    this.sound.back();
    this.router.navigate(['/main-menu']);
  }
}





