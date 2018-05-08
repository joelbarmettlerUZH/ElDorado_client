import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  public titles: string[];
  public descriptions: string[];
  public resources: string[];
  public index = 0;
  public contentLength: number;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.titles = [
      '1.) Organize your View',
      '2.) Move your playing piece',
      '3.) Wa-du-hek'
    ];

    this.descriptions = [
      'Waaaaduhek',
      'To make a move with one of your playing pieces, select all the cards you want to us for your move by clicking on them. Then, select one of your playing pieces - you are now shown all the possible positions you can move to. Click on one field to move to it.',
      'yeaah yeaah'
    ];
    this.resources = [
      './../../assets/GUI_MainMenu/MainBackground.jpg',
      './../../assets/tutorial/tutorial_move.gif',
      './../../assets/GUI_MainMenu/MainBackground.jpg'
    ];
    this.contentLength = this.descriptions.length;
  }

  navigateToMenu() {
    this.router.navigate(['/main-menu']);
  }

  previous() {
    this.index--;
  }

  next() {
    this.index++;
  }

}
