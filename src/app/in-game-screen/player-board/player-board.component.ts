import { Component, OnInit } from '@angular/core';
import { CHARACTERS } from '../../character-database';
import {Character} from '../../character';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.css']
})
export class PlayerBoardComponent implements OnInit {
  ownCharacter: Character = CHARACTERS[0];
  constructor() { }

  ngOnInit() {
  }

}
