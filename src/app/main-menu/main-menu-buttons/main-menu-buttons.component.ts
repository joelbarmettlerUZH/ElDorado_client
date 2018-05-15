import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MAINMENUBUTTONS} from '../../shared/models/button-database';
import {Router} from '@angular/router';
import {SoundService} from '../../shared/services/sound.service';

@Component({
  selector: 'app-main-menu-buttons',
  templateUrl: './main-menu-buttons.component.html',
  styleUrls: ['./main-menu-buttons.component.css']
})
export class MainMenuButtonsComponent implements OnInit {
  @Input() name: string;
  @Output() changeButtonsRequest = new EventEmitter<string>();
  buttons = MAINMENUBUTTONS;

  constructor(private router: Router, private sound: SoundService) {
  }

  // B | on main-menu button clicked (see HTML main-menu-buttons)
  // 1. action:
  // a) changeButtonsRequest to main-menu-button-board
  // 2. action: see main-menu-button-board component (via HTML)

  navigateTo(target: string) {
    this.sound.click();
    this.changeButtonsRequest.emit(target);
    console.log(target + ' Button wurde geklickt');
    console.log('Gesendet: changeButtonsRequest | von main-menu-buttons | Target:' + target + ' | Empfänger: main-menu-button-board');
  }

  gotoTutorial() {
    this.sound.click();
    this.router.navigate(['/tutorial']);
  }

  ngOnInit() {
    // this.navigationTarget = 'menu';
  }
}

// ToDO: In Template set button positions automatically

