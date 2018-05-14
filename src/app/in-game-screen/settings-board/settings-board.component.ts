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
    this.gameService.rawGetter().subscribe(
      game => {
        this.gameName = game.name;
      }
    );
  }

  onSelect() {
    this.isActive = !this.isActive;
  }
}
