import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';

@Component({
  selector: 'app-settings-board',
  templateUrl: './settings-board.component.html',
  styleUrls: ['./settings-board.component.css']
})
export class SettingsBoardComponent implements OnInit {

  public isActive = false;
  public gameName: String = '';

  constructor(private gameService: GameService) {

  }

  ngOnInit() {
    this.gameName = this.gameService.getGame().gameName;
  }

  onSelect() {
    console.log('Is activated: ' + this.isActive);
    this.isActive = !this.isActive;
    console.log('Is activated: ' + this.isActive);
  }
}
