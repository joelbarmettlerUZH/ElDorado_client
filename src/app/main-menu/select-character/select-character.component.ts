import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../shared/models/character';
import {CHARACTERS} from '../../shared/models/character-database';
import {User} from '../../shared/models/User';
import {UserService} from '../../shared/services/user.service';
import {RoomService} from '../../shared/services/room.service';
import {Observable} from 'rxjs/Observable';
import {Room} from '../../shared/models/Room';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-select-character',
  templateUrl: './select-character.component.html',
  styleUrls: ['./select-character.component.css']
})
export class SelectCharacterComponent implements OnInit {
  @Input()
  public me: User;
  areClickable: boolean;
  characters = CHARACTERS;
  selectedCharacter: Character;
  pollRoom: Room;
  private roomSubscription: any;

  constructor(private userService: UserService,
              private roomService: RoomService) {
  }

  updateUser(updatedName) {
    console.log('Method Call | updateUser | in select-character');
    this.me.name = updatedName;
    this.userService.modifyUser(this.me);
    console.log('REST | put | userService.modifyUser(this.me)| this.me = ' + this.me.name);
  }

  generateMainMenuView() {
    this.restoreCharacterDefault();
  }

  generateHostView() {
    this.restoreCharacterDefault();
    this.areClickable = true;
    this.selectedCharacter = this.characters[0];
  }

  generateJoinView(room) {
    this.restoreCharacterDefault();
    this.areClickable = true;
    let roomId = room.roomID;
    /*
    +  pollHandCards(): void {
+    this.roomSubscription = Observable.interval(1000).subscribe(x => {
+      this.getHandPile();
+    });
     */
    this.roomSubscription = Observable.interval(1000).subscribe(x => {
      this.roomService.getRoom(roomId).subscribe(
        request => {
          this.pollRoom = request;
          for (const user of this.pollRoom.users) {
            this.characters.filter(function (obj) {
              return obj.id == user.character;
            }).forEach(x => {
                console.log('"Assigned" of Character :' + x.name + 'before: ' + x.assigned);
                x.assigned = true;
                console.log('"Assigned" of Character :' + x.name + 'after: ' + x.assigned);
                console.log('"Ready" of Character :' + x.name + 'before: ' + x.ready);
                x.ready = user.ready;
                console.log('"Ready" of Character :' + x.name + 'after: ' + x.ready);
                x.name = user.name;
              }
            );
          }
        }
      );
    });
  }

  generateManualView() {
    this.restoreCharacterDefault();
    console.log('test');
  }

  ngOnInit() {
  this.areClickable = false;
  this.selectedCharacter = null;
  }

  onSelect(character: Character): void {
    if (this.areClickable && !character.assigned) {
      if (this.selectedCharacter) {
        this.selectedCharacter.ready = false;
      this.selectedCharacter.assigned = false;
      }
      this.selectedCharacter = character;
      console.log('Selected Character | Name: ' + this.selectedCharacter.name);
      character.assigned = true;
      if (this.me) {
        this.me.character = this.selectedCharacter.id;
        this.userService.modifyUser(this.me);
      }
    }
  }

  onReady(character: Character) {
    character.ready = true;
  }

  private restoreCharacterDefault() {
    this.areClickable = false;
    this.selectedCharacter = null;
    for (const character of this.characters) {
      character.ready = false;
      character.assigned = false;
      }
    }
  }

// ToDo source the HTML character unit out to the seperate component: character


