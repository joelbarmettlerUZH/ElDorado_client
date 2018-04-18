import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../../board.service';
import {Observable} from 'rxjs/Observable';
import {Board} from '../../../board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  hexagons: any[];
  public board: Board;
  private num: number;
  // xDim: Observable<number>;


  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    console.log('pre tutti complexo stuffo');
    // let hexagons = this.boardService.getHexagons();
    const x = 17;
    const y = 10;
    let xWidth = (100 / x);
    xWidth = ((100 - xWidth / 2) / x);
    const xOffset = (xWidth / 2);
    // this.xDim = this.boardService.getBoard();
    // this.board = this.boardService.getBoard();
    // console.log('testetsttes:',  );
    this.boardService.getBoard().subscribe(xdd => console.log('dkjafhlajkhflakjh:', xdd));
    this.boardService.getBoard().subscribe(json => console.log(json.xdim));
    this.boardService.getBoard().subscribe(num => this.num = num.xdim.valueOf());
    setTimeout( () => { console.log('djkhfskjjhjjjjj:', this.num); }, 2000 );
  }

  // this.boardService.getBoard().subscribe(data => this.board = {xdim: data['xDim']});
  // generateBoard(x, y);
  // createCSSSelector(".xOffset", "margin-left: "+xOffset.toString()+"%;")
  // choseOffsets(x);
}

