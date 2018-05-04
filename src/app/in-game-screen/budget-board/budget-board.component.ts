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

  constructor(private playerService: PlayerService) {
    this.playerService.specialActionSub.subscribe(
      budget => {
        try {
          this.isPerforming = budget.draw > 0 || budget.remove > 0 || budget.steal > 0;
        } catch (e) {
          console.log('-Budget Board Update: Error in performing action');
        }
      }
    );
  }

  ngOnInit() {
  }

  endAction() {
    this.playerService.resetSpecialActions().subscribe(y => {
      console.log('-Budget board: ended special action');
    });
  }


}

