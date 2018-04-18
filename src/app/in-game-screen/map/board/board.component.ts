import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Board} from '../../../shared/models/board';
import {BoardService} from '../../../shared/services/board.service';


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
  private xDim: number;
  private yDim: number;

  // xDim: Observable<number>;


  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    console.log('pre tutti complexo stuffo');
    const x = 17;
    const y = 10;
    this.colors = ['basecamp', 'grass', 'mountain', 'river', 'rubble', 'sand'];
    let xWidth = (100 / x);
    xWidth = ((100 - xWidth / 2) / x);
    const xOffset = (xWidth / 2);
    this.hexspace = generateBoard(x, y);
    createCSSSelector('.xOffset', 'margin-left: ' + xOffset.toString() + '%;');
    choseOffsets(x);
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
}

// this.boardService.getBoard().subscribe(data => this.board = {xdim: data['xDim']});
// generateBoard(x, y);
// createCSSSelector(".xOffset", "margin-left: "+xOffset.toString()+"%;")
// choseOffsets(x);
function choseOffsets(x: number) {
  console.log('Chosing offset now: ');
  let hexSpaces: NodeListOf<Element> = document.getElementsByClassName('hex');
  for (let i = 0; i < hexSpaces.length; i++) {
    console.log(this.xWidth.toString() + '%');
    let current: HTMLElement = hexSpaces[i] as HTMLElement;
    current.style.width = this.xWidth.toString() + '%';
    console.log(i);
    if ((i % ((x * 2))) - x == 0) {
      console.log('found one ' + i);
      hexSpaces[i].className += ' xOffset';
    }
  }
}

function generateBoard(x, y): string[] {
  console.log('Generating board');
  let arr: Array<string>;
  for (let i = 0; i < x * y; i++) {
    console.log('Looping ' + i);
    let color: string = this.colors[Math.floor(Math.random() * this.colors.length)];
    arr.push(color);
  }
  console.log('Returning board');
  return arr;
}

function createCSSSelector(selector, style) {
  console.log('Generate CSS');
  if (!document.styleSheets) return;
  if (document.getElementsByTagName('head').length == 0) return;

  let styleSheet, mediaType;

  if (document.styleSheets.length > 0) {
    for (let i = 0, l = document.styleSheets.length; i < l; i++) {
      if (document.styleSheets[i].disabled) {continue; }
      let media: MediaList = document.styleSheets[i].media;
      mediaType = typeof media;

      if (mediaType === 'string') {
        if (media.length == 0) { // || (media.('screen') !== -1)) {
          styleSheet = document.styleSheets[i];
        }
      }
      else if (mediaType == 'object') {
        if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
          styleSheet = document.styleSheets[i];
        }
      }

      if (typeof styleSheet !== 'undefined')
        break;
    }
  }

  if (typeof styleSheet === 'undefined') {
    let styleSheetElement = document.createElement('style');
    styleSheetElement.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

    for (let i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].disabled) {
        continue;
      }
      styleSheet = document.styleSheets[i];
    }

    mediaType = typeof styleSheet.media;
  }

  if (mediaType === 'string') {
    let l = styleSheet.rules.length;
    for (let i = 0; i < l; i++) {
      if (styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
        styleSheet.rules[i].style.cssText = style;
        return;
      }
    }
    styleSheet.addRule(selector, style);
  } else if (mediaType === 'object') {
    let styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
    for (let i = 0; i < styleSheetLength; i++) {
      if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
        styleSheet.cssRules[i].style.cssText = style;
        return;
      }
    }
    styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
  }
}



