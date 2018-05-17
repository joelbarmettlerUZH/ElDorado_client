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
    this.sound.soundState();
    this.titles = [
      '1.) Organize your view',
      '2.) Move your playing piece',
      '3.) Inspect & discard cards',
      '4.) Sell and buy cards',
      '5.) End your turn',
      '6.) Watch opponents turn',
      '7.) Remove blockades',
      '8.) Move over blockades',
      '9.) Action cards',
      '10.) Special moving cards',
      '11.) Moving on multi-card fields',
      '12.) Entering ElDorado',
      '13.) Last round',
      '14.) Winning'
    ];

    this.descriptions = [
      'To have a better overview over the current game, you can move yourself around by dragging the map or zoom in-out with your mouse wheel. Collapsing and expanding certain areas of your viewport will provide you with a cleaner and more focused screen.',
      'To make a move with one of your playing pieces, select all the cards you want to use for your move by clicking them. Then, select one of your playing pieces - you are now shown all the possible positions you can move to. By clicking on one of the highlighted fields, your playing piece will move to the new position.',
      'If you want to discard one of your cards, select it, then press on the appearing "discard" symbol underneath. If you wish to further inspect your card first, press on the magnifying glass to open up the card in full-screen mode. Close the full-screen by clicking anywhere on the screen.',
      'Select the card you would like to sell, then press on the "sell" icon appearing underneath it. The cards worth gets added to your market credit. Slide out the market and click on the card that you want to buy. If you want to have a closer look at the card first, click on the magnifying glass.',
      'When you are done with your actions, press the "End Round" button in the bottom-left corner. You automatically draw new cards and your opponents turn starts.',
      'While your opponent is playing, his played cards appear next to him on the board. Click on a card to have a closer look at it. The symbols appearing over the cards indicate the actions performed with this particular card. When the player finishes, your character will become highlighted again and you are ready to make your moves.',
      'To remove a blockade, you can either move beside it and select the cards needed to remove it, or you simply move over the blockade if your cards strength allows so. The blockade gets removed automatically and will appear in your inventory.',
      'Blockades are a special game-element and do not always act like normal fields. You can only move over them in particular directions, indicated by the bridges. Select a card to move over a blockade and follow the indicated paths.',
      'To use an action card, select it individually and press on the "Action" button appearing on top of it. The cards actions will either be performed automatically or left open for you to perform. If you do not wish to perform an action, cancel the card by clicking on the appearing "End Action" button to the right of your card board.',
      'There are a few cards in the game that allow for special moving. By selecting the card and a playing piece, the pathfinder will show you all reachable fields automatically, supporting you in executing the move.',
      'Some fields in the game require you to use multiple cards to move on - like a Rubble 2 field. To move on the corresponding field, select all the cards needed simultaneously and click on the field when it becomes highlighted.',
      'When one of your playing pieces reaches the fields right before ElDorado, it will automatically enter the city. Be sure to move all your playing pieces to that area in order to possibly win the game.',
      'When the first player has all its playing pieces moved to ElDorado, the current round will be finished before a winner is determined. The player that started the game is indicated via the hat symbol. If no player wears the hat, you started the game yourself. The order of play is from top to bottom.',
      'When a player reached ElDorado with all its playing pieces and the last round finished, the winner is determined and the game comes to an end. Return to the home screen and start your next round!'
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
    this.sound.soundState(!this.musicPlaying);
  }

}
