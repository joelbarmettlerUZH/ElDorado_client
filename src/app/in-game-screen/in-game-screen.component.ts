import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})
export class InGameScreenComponent implements OnInit {

  constructor(  private route: ActivatedRoute,
                private location: Location) { }

  ngOnInit() {
  }

}
