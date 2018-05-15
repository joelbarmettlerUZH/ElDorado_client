import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {SoundService} from '../../shared/services/sound.service';
import {Game} from '../../shared/models/Game';

@Component({
  selector: 'app-settings-board',
  templateUrl: './settings-board.component.html',
  styleUrls: ['./settings-board.component.css']
})
export class SettingsBoardComponent implements OnInit {

  public isActive = false;
  public gameName: String = '';

  constructor(private gameService: GameService, private sound: SoundService) {

  }

  ngOnInit() {
    this.gameService.rawGetter().subscribe(
      game => {
        this.gameName = game.gameName;
      }
    );
  }

  onSelect() {
    if (this.isActive) {
      this.sound.close();
    } else {
      this.sound.open();
    }
    this.isActive = !this.isActive;
  }
}
