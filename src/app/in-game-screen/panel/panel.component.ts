import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SettingsService} from '../../shared/services/settings.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

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

  constructor(private settingsService: SettingsService, private router: Router) {
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
    this.settingsService.showPathfinderState();
  }

  showCurrentClick() {
    this.settingsService.showCurrentState();
  }

  showMarketClick() {
    this.settingsService.showMarketState();
  }

  leaveGame() {
    this.router.navigate(['/main-menu']);
  }

  ngOnDestroy() {
    this.pathfinderSubscription.unsubscribe();
    this.currentSubscription.unsubscribe();
    this.marketSubscription.unsubscribe();
  }
}
