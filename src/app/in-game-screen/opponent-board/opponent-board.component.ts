import { Component, OnInit } from '@angular/core';
import { Character } from '../../character';
import { CHARACTERS } from '../../character-database';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-opponent-board',
  templateUrl: './opponent-board.component.html',
  styleUrls: ['./opponent-board.component.css']
})
export class OpponentBoardComponent implements OnInit {
  characters = CHARACTERS;
  players: any[];

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.getPlayers();
    console.log(this.players)
  }

  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(players => this.players = players);

  }

}
