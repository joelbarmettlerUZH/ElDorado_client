import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SettingsService} from '../../shared/services/settings.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {SoundService} from '../../shared/services/sound.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnDestroy {

  @Input()
  public isActive;

  private pathfinderSubscription: Subscription;
  public showPathfinder: Boolean;

  private currentSubscription: Subscription;
  public showCurrent: Boolean;

  private marketSubscription: Subscription;
  public showMarket: Boolean;

  public playMusic: Boolean = true;
  public playSound: Boolean = true;

  constructor(private settingsService: SettingsService, private router: Router, private sound: SoundService) {
  }

  ngOnInit() {
    this.pathfinderSubscription = this.settingsService.showPathfinderSub.subscribe(
      show => {
        try {
          this.showPathfinder = show;
        } catch (e) {
          console.log('ERROR: Could not set pathfinder setting value');
        }
      }
    );
    this.currentSubscription = this.settingsService.showCurrentSub.subscribe(
      show => {
        try {
          this.showCurrent = show;
        } catch (e) {
          console.log('ERROR: Could not set Current setting value');
        }
      }
    );
    this.marketSubscription = this.settingsService.showMarketSub.subscribe(
      show => {
        try {
          this.showMarket = show;
        } catch (e) {
          console.log('ERROR: Could not set Market setting value');
        }
      }
    );
  }

  showPathfinderClick() {
    this.sound.click();
    this.settingsService.showPathfinderState();
  }

  showCurrentClick() {
    this.sound.click();
    this.settingsService.showCurrentState();
  }

  showMarketClick() {
    this.sound.click();
    this.settingsService.showMarketState();
  }

  musicClick() {
    this.sound.click();
    this.playMusic = !this.playMusic;
    this.sound.backgroundMusicState(this.playMusic);
  }

  soundClick() {
    this.sound.click();
    this.playSound = !this.playSound;
    this.sound.soundState(this.playSound);
  }

  leaveGame() {
    this.sound.click();
    this.router.navigate(['/main-menu']);
  }

  ngOnDestroy() {
    this.pathfinderSubscription.unsubscribe();
    this.currentSubscription.unsubscribe();
    this.marketSubscription.unsubscribe();
  }
}
