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
  areGreyedOut: boolean;
  isSelected: boolean;
  characters = CHARACTERS;
  selectedCharacter: Character;

  onSelect(character: Character): void {
    if (this.areClickable) {
      this.selectedCharacter = character;
    }
  }

  constructor() {
  }

  ngOnInit() {
    this.areClickable = false;
    this.areGreyedOut = false;
    this.isSelected = false;
  }

  generateMainMenuView() {
    this.restoreCharacterDefault();
  }

  generateHostView() {
    this.restoreCharacterDefault();
    this.areClickable = true;
    this.areGreyedOut = true;
    this.selectedCharacter = this.characters[0];
  }

  generateJoinView() {
    this.restoreCharacterDefault();
    this.areClickable = true;
    this.areGreyedOut = true;
  }

  generateManualView() {
    this.restoreCharacterDefault();
  }

  private restoreCharacterDefault() {
    this.selectedCharacter = null;
    this.areClickable = false;
    this.areGreyedOut = false;
    this.isSelected = false;
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

}

// ToDo source the HTML character unit out to the seperate component: character


