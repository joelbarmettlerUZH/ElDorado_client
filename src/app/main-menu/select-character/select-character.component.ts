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


  constructor() {
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
    this.selectedCharacter = null;
  }

  onSelect(character: Character): void {
    if (this.areClickable) {
      if (this.selectedCharacter) {
        this.selectedCharacter.ready = false;
      }
      this.selectedCharacter = character;
      console.log(this.selectedCharacter.name + 'is selected.');
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
    }
  }
}

// ToDo source the HTML character unit out to the seperate component: character


