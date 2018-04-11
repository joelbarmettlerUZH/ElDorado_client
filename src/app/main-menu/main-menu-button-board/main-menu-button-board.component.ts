import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-main-menu-button-board',
  templateUrl: './main-menu-button-board.component.html',
  styleUrls: ['./main-menu-button-board.component.css']
})
export class MainMenuButtonBoardComponent implements OnInit {
  selectedButtonName: string;

  constructor() {
  }

  ngOnInit() {
    this.selectedButtonName = 'menu';
  }


}
