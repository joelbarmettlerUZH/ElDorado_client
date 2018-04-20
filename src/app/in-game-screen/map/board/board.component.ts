import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Board} from '../../../shared/models/board';
import {BoardService} from '../../../shared/services/board.service';
import {by} from 'protractor';
import {Hexspace} from '../../../shared/models/hexSpace';
import {MoveWrapper} from '../../../shared/models/MoveWrapper';
import {PlayingPiece} from '../../../shared/models/PlayingPiece';
import {Point} from '../../../shared/models/point';
import {Card} from '../../../shared/models/Card';
import {PlayerService} from '../../../shared/services/player.service';
import {saveCookie} from '../../../shared/cookieHandler';
import {GameService} from '../../../shared/services/game.service';
import {SelectCharacterComponent} from '../../../main-menu/select-character/select-character.component';
import {HexspaceComponent} from '../hexspace/hexspace.component';
import {Player} from '../../../shared/models/Player';
import {Game} from '../../../shared/models/Game';
import {forEach} from '@angular/router/src/utils/collection';

declare var $: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public hexagons: Hexspace[];
  // public colors: string[];
  public game: Game;
  public xDim: number;
  public yDim: number;
  public yWidth: number;
  public xOffset: number;
  public board: Board;
  public players: Player[];
  public ownPlayingPieces: PlayingPiece[] = [];
  public opponentPlayingPieces: PlayingPiece[] = [];

  @ViewChild('childHex')
  private childHex: HexspaceComponent;

  constructor(private gameService: GameService, private playerService: PlayerService) {
  }

  async ngOnInit() {

    this.gameService.getGame().subscribe(
      response => {
        this.game = response;
        this.board = this.game.pathMatrix;
        this.xDim = this.board.xdim;
        this.yDim = this.board.ydim;
        this.hexagons = this.board.matrixArray;
        this.yWidth = (100 / this.yDim);
        this.yWidth = Math.round(((100 - this.yWidth / 2) / this.yDim) * 100) / 100;


        this.players = this.game.players;
        this.players.forEach(player => {
          if(player.playerId == Number(localStorage.getItem("playerId"))){
            player.playingPieces.forEach(
              playingPiece => this.ownPlayingPieces.push(playingPiece));
          }else{
            player.playingPieces.forEach(
              playingPiece => this.opponentPlayingPieces.push(playingPiece));
          }
        });


        this.ownPlayingPieces.forEach(
          playingPiece => {
            let x = playingPiece.standsOn.point.x;
            let y = playingPiece.standsOn.point.y;
            let index = (x * this.yDim) + y;
            // TODO: Call right method on hexagon to display own PlayingPiece
            // this.hexagons[index].doSomething()
          }
        );

        this.panZoom();
      }

    );

    let reachables: Hexspace[];
    this.getWay([], 0).subscribe(
      res => {
        reachables = res;
        reachables.forEach(reachable => console.log("NEW REACHABLE: " + reachable));
      });

  }


  panZoom() {
    var $section = $('#board');
    var $panzoom = $section.find('.panzoom').panzoom();
    $panzoom.parent().on('mousewheel.focal', function (e) {
      e.preventDefault();
      var delta = e.delta || e.originalEvent.wheelDelta;
      var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      $panzoom.panzoom('zoom', zoomOut, {
        increment: 0.1,
        animate: false,
        focal: e
      });
    });
  }

  getWay(cards: Card[], playingPieceId: number) {

    let moveWrapper: MoveWrapper = new MoveWrapper(cards, null);
    return this.playerService.findPath(moveWrapper, playingPieceId);



  }




}

