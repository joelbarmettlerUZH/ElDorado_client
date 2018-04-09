import {Component, Injectable, OnInit} from '@angular/core';
import { Button } from '../../button';
import { BUTTONS } from '../../button-database';
import { Http, Response, URLSearchParams } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})

@Injectable()
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
