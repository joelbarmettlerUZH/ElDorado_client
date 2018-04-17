import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../../board.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  hexagons: any[];
  public board: any;
  // xDim: Observable<number>;
  dimen: any[] = [];
  private dimension: any[];

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
    this.boardService.getBoard()
      .subscribe(dim => {
          this.dimen = dim;
          this.dimension = this.dimen.filter(a => a.key === 'xdim');
        console.log('dimx: ' + this.dimension[0]);
        });
  }

  // this.boardService.getBoard().subscribe(data => this.board = {xdim: data['xDim']});
  // generateBoard(x, y);
  // createCSSSelector(".xOffset", "margin-left: "+xOffset.toString()+"%;")
  // choseOffsets(x);
}

