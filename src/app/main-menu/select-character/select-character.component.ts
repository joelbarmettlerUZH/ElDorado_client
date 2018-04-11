import { Component, OnInit } from '@angular/core';
import { Character } from '../../character';
import { CHARACTERS} from '../../character-database';

@Component({
  selector: 'app-select-character',
  templateUrl: './select-character.component.html',
  styleUrls: ['./select-character.component.css']
})
export class SelectCharacterComponent implements OnInit {
  characters = CHARACTERS;
  selectedCharacter: Character;

  onSelect(character: Character): void {
    this.selectedCharacter = character;
  }
  constructor() { }
  ngOnInit() {
  }

}
