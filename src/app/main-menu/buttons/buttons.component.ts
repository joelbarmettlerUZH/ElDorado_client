import { Component, OnInit } from '@angular/core';
import { Button } from '../../button';
import { BUTTONS } from '../../button-database';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  buttons = BUTTONS;
  selectedButton: Button;

  onSelect(button: Button): void {
    this.selectedButton = button;
  }
  constructor() { }

  ngOnInit() {
  }

}
