import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-board',
  templateUrl: './settings-board.component.html',
  styleUrls: ['./settings-board.component.css']
})
export class SettingsBoardComponent implements OnInit {

  public isActive = false;
  constructor() { }

  ngOnInit() {
  }
  onSelect() {
    console.log('Is activated: ' + this.isActive);
    this.isActive = !this.isActive;
    console.log('Is activated: ' + this.isActive);
  }

}
