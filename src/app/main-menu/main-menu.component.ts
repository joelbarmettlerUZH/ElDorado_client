import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../shared/models/User';
import {MainMenuButtonBoardComponent} from './main-menu-button-board/main-menu-button-board.component';
import {UserService} from '../shared/services/user.service';
import {CharacterSelectionComponent} from './character-selection/character-selection.component';
import {Room} from '../shared/models/Room';
import {saveGameId} from '../shared/cookieHandler';
import {SoundService} from '../shared/services/sound.service';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {

  @Output() changeCharacterRequest = new EventEmitter<string>();

  // @ViewChild('childCharacter')
  // private childCharacter: SelectCharacterComponent;

  @ ViewChild('selectCharacter')
  private selectCharacter: CharacterSelectionComponent;

  @ViewChild('childButtonArea')
  private childButtonArea: MainMenuButtonBoardComponent;

  public musicPlaying: Boolean = true;

  mainMenuScreen: string;
  me: User;


  constructor(private userService: UserService, private sound: SoundService) {
  }

  ngOnInit() {
    // clear local storage and delete user.
    this.userService.deleteUser(Number(localStorage.getItem('userId')));
    localStorage.clear();
    // delete local storage and respective user when refreshing
    saveGameId(-1);
    localStorage.setItem('load', 'first');
    this.mainMenuScreen = 'main-menu';
    this.sound.backgroundMusicState();
  }



  // G | on home button clicked (see TS main-menu-button-board component, Function C: navigateToMenu)
  // 1. action: on event received: invoke method on select-character component
  // 2. action: see select-character component
  // ToDo exchange paramter
  public restoreMainMenu() {
    // clear local storage and delete user.
    this.userService.deleteUser(Number(localStorage.getItem('userId')));
    localStorage.clear();
    console.log('Restore MainMenu');
    this.selectCharacter.generateMainMenuView();
  }


  private consultManual() {
    this.selectCharacter.generateManualView();
  }

  // A.1 & A.2 | on join/host button clicked (see HTML join/host-buttons component)
  // 3. action:
  // a) on got request: call join view on child
  // 4. action: see selected-character component

  public changeCharacters(room: Room) {
    console.log('ERHALTEN: HigherCharacterRequest');
    console.log('Room boardID: ' + room.roomID + ' Room name: ' + room.name);
    this.selectCharacter.generateJoinView(room);
  }

  public musicState() {
    this.musicPlaying = !this.musicPlaying;
    this.sound.backgroundMusicState(this.musicPlaying);
    this.sound.soundState(this.musicPlaying);
  }
}
