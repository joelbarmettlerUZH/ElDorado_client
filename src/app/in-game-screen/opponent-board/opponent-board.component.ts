import { Component, OnInit } from '@angular/core';
import { Character } from '../../character';
import { CHARACTERS } from '../../character-database';

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
