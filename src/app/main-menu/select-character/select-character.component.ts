import {Component, OnInit} from '@angular/core';
import {Character} from '../../character';
import {CHARACTERS} from '../../character-database';

@Component({
  selector: 'app-select-character',
  templateUrl: './select-character.component.html',
  styleUrls: ['./select-character.component.css']
})
export class SelectCharacterComponent implements OnInit {

  areClickable: boolean;

  characters = CHARACTERS;
  selectedCharacter: Character;

  character1AlreadyAssigned: boolean;
  character2AlreadyAssigned: boolean;
  character3AlreadyAssigned: boolean;
  character4AlreadyAssigned: boolean;
  AlreadyAssigned;

  constructor() {
  }

  onSelect(character: Character): void {
    if (this.areClickable) {
      this.selectedCharacter = character;
      console.log(this.selectedCharacter.name + 'is selected.');
    }
  }

  generateMainMenuView() {
    this.restoreCharacterDefault();
  }

  generateHostView() {
    this.restoreCharacterDefault();
    this.areClickable = true;
    this.selectedCharacter = this.characters[0];
  }

  generateJoinView() {
    this.restoreCharacterDefault();
    this.areClickable = true;
  }

  generateManualView() {
    this.restoreCharacterDefault();
  }

  ngOnInit() {
    this.areClickable = false;
    this.character1AlreadyAssigned = false;
    this.character2AlreadyAssigned = false;
    this.character3AlreadyAssigned = false;
    this.character4AlreadyAssigned = false;
    this.selectedCharacter = null;
  }

  // if(mainMenuScreen = 'menubutton-joingame') {
  //   this.areClickable = true;
  //   console.log('this.areClickable should be true, is: ' + this.areClickable);
  // }
  //
  // if(mainMenuScreen = 'main-menu') {
  //   this.areClickable = false;
  // }
  //
  // if(mainMenuScreen = 'menubutton-hostgame') {
  //   this.areClickable = true;
  // }
  //
  // if(mainMenuScreen = 'menubutton-manual') {
  //   this.areClickable = true;
  // }

  private restoreCharacterDefault() {
    this.areClickable = false;

    this.character1AlreadyAssigned = false;
    this.character2AlreadyAssigned = false;
    this.character3AlreadyAssigned = false;
    this.character4AlreadyAssigned = false;

    this.selectedCharacter = null;
  }
}

// ToDo source the HTML character unit out to the seperate component: character


