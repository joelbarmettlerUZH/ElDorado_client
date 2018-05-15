import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SoundService} from '../shared/services/sound.service';

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

  public musicPlaying: Boolean = true;

  constructor(private router: Router, private sound: SoundService) {
  }

  ngOnInit() {
    this.sound.backgroundMusicState();
    this.titles = [
      '1.) Organize your View',
      '2.) Move your playing piece',
      '3.) Discard cards',
      '4.) Sell and buy cards',
      '5.) End your turn',
      '6.) Watch opponents turn',
      '7.) Start your next turns',
      '8.) Remove blockades',
      '9.) Buy from passive market',
      '10.) Game settings'
    ];

    this.descriptions = [
      'To have a better sight over the game, you can navigate over the map through zooming with your mouse wheel or moving arround by holding-and-dragging. By clicking on the round areas, you can collapse certain areas to provide a cleaner view.',
      'To make a move with one of your playing pieces, select all the cards you want to us for your move by clicking on them. Then, select one of your playing pieces - you are now shown all the possible positions you can move to. Click on one field to move to it.',
      'If you want to discard one of your cards, select it, then press on the appearing "discard" simbol underneath.',
      'Select the card you would like to sell, then press on the "sell" icon appearing underneath it. The cards worth gets added to your market credit. Slide out the market and click on the card that wou want to buy. If you want to have a closer look at the card first, click on the magnifying glass',
      'When you are done with your actions, press on the "End Round" button in the bottom-left corner. You automatically draw new cards and your opponents turn start',
      'While your opponent is playing, his played cards appear next to him on the board. Click on a card to have a closer look at it. Watch his playingpieces move.',
      'As soon as your opponents finish, your character becomes colored again and you can start performing new moves.',
      'To remove a blockade, you can either move beside it and select the cards needed to remove it, or you simply move over the blockade if your cards strength allows so. The blockade gets removed automatically.',
      'When a slot from the active market is empty, you can also buy from the passive market by clicking on one of the purchasable cards. The corresponding slot is then moved to the active market.',
      'With extending the settings panel, you can turn on/off supporting features like the pathfinder or gamesounds.'
    ];
    this.contentLength = this.descriptions.length;
  }

  navigateToMenu() {
    this.sound.click();
    this.router.navigate(['/main-menu']);
  }

  previous() {
    this.sound.back();
    this.index--;
  }

  next() {
    this.sound.back();
    this.index++;
  }

  public musicState() {
    this.musicPlaying = !this.musicPlaying;
    this.sound.backgroundMusicState(this.musicPlaying);
  }

}
