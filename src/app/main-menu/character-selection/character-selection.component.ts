import { Component, OnInit } from '@angular/core';
import {CHARACTERS} from '../../shared/models/character-database';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {RoomService} from '../../shared/services/room.service';
import {Room} from '../../shared/models/Room';
import {PollCharacter} from '../../shared/models/pollCharacter';
import {POLLCHARACTER} from '../../shared/models/defaultPollCharacters';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {Router} from '@angular/router';
import 'rxjs/add/observable/interval';


@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent implements OnInit {

  defaultCharacters = POLLCHARACTER;
  private roomSubscription: Subscription;
  private gameSubscription: Subscription;
  public pollRoom: Room;
  characters: PollCharacter[];
  mainMenu: boolean;
  public player: Player;


  constructor(private roomService: RoomService,
              private playerService: PlayerService,
              private router: Router) { }

  ngOnInit() {
    console.log('character-selection')
    this.characters = this.defaultCharacters.slice(0);
    this.mainMenu = true;
  }

  pollingRoom(room: Room) {
    this.roomSubscription = Observable.interval(300).subscribe(y => {
      this.roomService.getRoom(room.roomID).subscribe(
        request => {
          if (typeof this.pollRoom === 'undefined' || (JSON.stringify(this.pollRoom) !== JSON.stringify(request))) {
            console.log('change detected');
            this.pollRoom = request;
              for (const character of this.defaultCharacters) {
                const users = this.pollRoom.users.filter(user => user.character === character.id);
                  if (users.length > 0) {
                    character.user = users[0];
                    character.ready = users[0].ready;
                    character.name = users[0].name;
                  } else {
                    character.user = null;
                    character.ready = false;
                    // reset name of unselected character
                    character.name = this.defaultCharacters.filter(char => char.id === character.id)[0].name;
                  }
            }
          }
        });
    });
    this.gameSubscription = Observable.interval(1000).subscribe(y => {
      console.log(Number(localStorage.getItem('userId')));
      this.playerService.getPlayer(Number(localStorage.getItem('userId'))).subscribe(player => {
        this.player = player;
        if (this.player.playerId === Number(localStorage.getItem('userId'))) {
          this.router.navigate(['/games', room.roomID]);
          this.roomSubscription.unsubscribe();
          this.gameSubscription.unsubscribe();
        }
      });
    });
  }

  generateJoinView(room) {
    this.mainMenu = false;
    this.pollingRoom(room);
  }

  generateManualView() {
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
    }
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    this.mainMenu = true;
    this.characters = this.defaultCharacters;
    // this.characters.forEach(char => char.)
    console.log('test');
  }

  generateMainMenuView() {
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
    }
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    this.mainMenu = true;

  }
}
