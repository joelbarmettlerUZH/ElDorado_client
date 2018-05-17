import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-eldorado-reached-screen',
  templateUrl: './eldorado-reached-screen.component.html',
  styleUrls: ['./eldorado-reached-screen.component.css']
})
export class EldoradoReachedScreenComponent implements OnInit {
  reachedNum: number;

  constructor() {
  }

  ngOnInit() {
    this.reachedNum = 0;
  }
}
