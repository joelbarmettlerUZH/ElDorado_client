import {Component, Input, OnInit} from '@angular/core';
import {PollCharacter} from '../../shared/models/pollCharacter';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/User';
import {POLLCHARACTER} from '../../shared/models/defaultPollCharacters';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  @Input()
  usedCharacter: PollCharacter;

  defaultCharacters = POLLCHARACTER;
  ownUserId: number;
  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.ownUserId = Number(localStorage.getItem('userId'));
  }

  onSelect() {
    // this.usedCharacter.name = this.defaultCharacters[this.usedCharacter.boardID].name;
    this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe(res => {
      this.user = res;
      this.user.ready = false;
      this.user.character = this.usedCharacter.id;
      this.userService.modifyUser(this.user);
    });
  }

  updateUser(updatedName) {
    this.usedCharacter.user.name = updatedName;
    // this.usedCharacter.name = updatedName;
    this.userService.modifyUser(this.usedCharacter.user);
    console.log('REST | put | userService.modifyUser(this.me)| this.me = ' + this.usedCharacter.user.name);
  }

  onReady() {
    this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe(res => {
      this.user = res;
      this.user.ready = true;
      this.userService.modifyUser(this.user);
    });
  }
}

