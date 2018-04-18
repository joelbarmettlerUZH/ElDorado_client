import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Board} from '../../../shared/models/board';
import {BoardService} from '../../../shared/services/board.service';
import {by} from 'protractor';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  hexagons: any[];
  public hexspace: string[];
  public board: Board;
  private num: number;
  public colors: string[];
  public xDim: number;
  public yDim: number;
  public xWidth: number;
  public xOffset: number;

  // xDim: Observable<number>;


  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    console.log('pre tutti complexo stuffo');
    this.xDim = 17;
    this.yDim = 8;
    this.colors = ['basecamp', 'grass', 'mountain', 'river', 'rubble', 'sand'];
    this.xWidth = (100 / this.xDim);
    this.xWidth = Math.round(((100 - this.xWidth / 2) / this.xDim) * 100 ) / 100;
    this.xOffset = Math.round((this.xWidth / 2) * 100) / 100;
    console.log(this.colors[2]);
    this.hexspace = this.generateBoard(this.xDim, this.yDim);
    console.log('hexspace length: ' + this.hexspace.length)
    this.panZoom();
    // this.createCSSSelector('.xOffset', 'margin-left: ' + this.xOffset.toString() + '%;');
    // this.choseOffsets(x);

    console.log('pre tutti complexo stuffo');
    // let hexagons = this.boardService.getHexagons();
    // this.xDim = this.boardService.getBoard();
    // this.board = this.boardService.getBoard();
    // console.log('testetsttes:',  );
    // this.boardService.getBoard().subscribe(xdd => console.log('dkjafhlajkhflakjh:', xdd));
    // this.boardService.getBoard().subscribe(json => console.log(json.xdim));
    // this.boardService.getBoard().subscribe(val => this.xDim = val.xdim.valueOf());
    // this.boardService.getBoard().subscribe(val => this.yDim = val.ydim.valueOf());

    setTimeout(() => {
      console.log('Got and assigned x Dimension:', this.xDim);
    }, 2000);
    setTimeout(() => {
      console.log('Got and assigned y Dimension:', this.yDim);
    }, 2000);
  }


// this.boardService.getBoard().subscribe(data => this.board = {xdim: data['xDim']});
// generateBoard(x, y);
// createCSSSelector(".xOffset", "margin-left: "+xOffset.toString()+"%;")
// choseOffsets(x);

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

  panZoom(){
      var $section = $('#board');
      var $panzoom = $section.find('.panzoom').panzoom();
      $panzoom.parent().on('mousewheel.focal', function( e ) {
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

}

