import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlayerService} from '../../shared/services/player.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {INTERVAL} from '../../shared/services/INTERVAL';
import {SpecialAction} from '../../shared/models/SpecialAction';

@Component({
  selector: 'app-budget-board',
  templateUrl: './budget-board.component.html',
  styleUrls: ['./budget-board.component.css']
})
export class BudgetBoardComponent implements OnInit {
  public isPerforming = false;
  public SpecialActionSubscribtion: Subscription;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerService.rawGetter().subscribe(res => {
      this.SpecialActionSubscribtion = Observable.interval(INTERVAL.specialAction()).subscribe(response => {
        const budget: SpecialAction = this.playerService.getPlayer().specialAction;
        this.isPerforming = budget.draw > 0 || budget.remove > 0 || budget.steal > 0;
      });
    });
  }

  endAction() {
    this.playerService.resetSpecialActions().subscribe(y => {
      console.log('ended special action');
    });
  }


}

