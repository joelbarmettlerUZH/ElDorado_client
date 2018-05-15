import { Injectable } from '@angular/core';

@Injectable()
export class SoundService {

  private soundOn: Boolean = true;

  private backgroundMusic = new Audio('./../../../assets/sounds/eldorado_1.mp3');
  private clickSound = new Audio('./../../../assets/sounds/click_1.mp3');
  private backSound = new Audio('./../../../assets/sounds/back_1.mp3');
  private buySound = new Audio('./../../../assets/sounds/buy_1.mp3');
  private closeSound = new Audio('./../../../assets/sounds/close_1.mp3');
  private collectSound = new Audio('./../../../assets/sounds/collect_1.mp3');
  private discardSound = new Audio('./../../../assets/sounds/discard_1.mp3');
  private moveSound = new Audio('./../../../assets/sounds/move_1.mp3');
  private openSound = new Audio('./../../../assets/sounds/open_1.mp3');
  private sellSound = new Audio('./../../../assets/sounds/sell_1.mp3');
  private cardSound = new Audio('./../../../assets/sounds/card_1.mp3');
  private removeSound = new Audio('./../../../assets/sounds/remove_1.mp3');
  private playerSound = new Audio('./../../../assets/sounds/player_1.mp3');

  constructor() {
    this.backgroundMusic.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
  }

  public soundState(play: Boolean = true) {
    this.soundOn = play;
  }

  public click() {
    if (this.soundOn) {
      this.clickSound.play();
    }
  }

  public back() {
    if (this.soundOn) {
      this.backSound.play();
    }
  }

  public buy() {
    if (this.soundOn) {
      this.buySound.play();
    }
  }

  public close() {
    if (this.soundOn) {
      this.closeSound.play();
    }
  }

  public collect() {
    if (this.soundOn) {
      this.collectSound.play();
    }
  }

  public discard() {
    if (this.soundOn) {
      this.discardSound.play();
    }
  }

  public move() {
    if (this.soundOn) {
      this.moveSound.play();
    }
  }

  public open() {
    if (this.soundOn) {
      this.openSound.play();
    }
  }

  public sell() {
    if (this.soundOn) {
      this.sellSound.play();
    }
  }

  public card() {
    if (this.soundOn) {
      this.cardSound.play();
    }
  }

  public remove() {
    if (this.soundOn) {
      this.removeSound.play();
    }
  }

  public player() {
    if (this.soundOn) {
      this.playerSound.play();
    }
  }

  public backgroundMusicState(play: Boolean = true) {
    if (play) {
      this.backgroundMusic.play();
    } else {
      this.backgroundMusic.pause();
    }
  }

}
