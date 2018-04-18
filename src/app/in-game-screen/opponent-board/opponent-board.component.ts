import { Component, OnInit } from '@angular/core';
import { Character } from '../../shared/models/character';
import { CHARACTERS } from '../../shared/models/character-database';

@Component({
  selector: 'app-opponent-board',
  templateUrl: './opponent-board.component.html',
  styleUrls: ['./opponent-board.component.css']
})
export class OpponentBoardComponent implements OnInit {
  characters = CHARACTERS;
  constructor() { }

  ngOnInit() {
  }

}
