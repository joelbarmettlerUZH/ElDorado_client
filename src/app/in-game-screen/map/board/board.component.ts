import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Board} from '../../../shared/models/board';
import {BoardService} from '../../../shared/services/board.service';
import {by} from 'protractor';
import {Hexspace} from '../../../shared/models/hexSpace';
import {MoveWrapper} from '../../../shared/models/MoveWrapper';
import {PlayingPiece} from '../../../shared/models/PlayingPiece';
import {Point} from '../../../shared/models/point';
import {Card} from '../../../shared/models/Card';

declare var $: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public hexagons: Hexspace[];
  // public colors: string[];
  public xDim: number;
  public yDim: number;
  public yWidth: number;
  public xOffset: number;
  public board: Board;
  public fakeWrapper: MoveWrapper;
  public fakePlayingPiece: PlayingPiece;
  public fakeHexspace: Hexspace;
  public fakePoint: Point;

  constructor(private boardService: BoardService) {
  }

  async ngOnInit() {
    console.log('pre tutti complexo stuffo');
    // getting resources from api via service

    this.boardService.getBoard().subscribe(
      res => {
        this.board = res;
        console.log(this.board);

        this.xDim = this.board.xdim;
        this.yDim = this.board.ydim;
        this.hexagons = this.board.matrixArray;

        // calculate the width of a single hexspace (derived from total width and number of hexspaces
        this.yWidth = (100 / this.yDim);
        this.yWidth = Math.round(((100 - this.yWidth / 2) / this.yDim) * 100) / 100;
        // introduce shifting of every second row ao achieve honeycomb pattern
        // this.xOffset = Math.round((this.xWidth / 2) * 100) / 100;
        // this.hexspace = this.generateBoard(this.xDim, this.yDim);
        // init panZoom to make board draggable and zoomable
        this.panZoom();
      }
    );

    this.fakePoint = new Point(4, 4);
    this.fakeHexspace = new Hexspace(30, 1, 1, 99, 'JUNGLE', this.fakePoint);
    this.fakePlayingPiece = new PlayingPiece(20, this.fakeHexspace)
    // this.fakeWrapper = new MoveWrapper()
    this.boardService.getWay(3,);

  }

  // outdated funnction used for testing
  /*
  generateBoard(x, y): string[] {
    console.log('Generating board');
    let arr: string[] = new Array();
    for (let i = 0; i < x * y; i++) {
      console.log('Looping ' + i);
      let color: string;
      console.log('random number' + Math.floor(Math.random() * this.colors.length));
      console.log('Looping ' + i);
      color = this.colors[Math.floor(Math.random() * this.colors.length)];
      arr.push(color);
    }
    console.log('Returning board: ' + arr.length);
    return arr;
  }
  */

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

  getWay(cards: Card[], player: Player) {


  }

}

