import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-budget-board',
  templateUrl: './budget-board.component.html',
  styleUrls: ['./budget-board.component.css']
})
export class BudgetBoardComponent implements OnInit {
  @Input()
  public budgetBoardIsActive: boolean;
  @Output() actionRequest = new EventEmitter<boolean>();


  constructor() {
  }

  ngOnInit() {
    this.budgetBoardIsActive = false;
    this.actionRequest.emit(this.budgetBoardIsActive);
  }

  onSelect() {
    this.budgetBoardIsActive = !this.budgetBoardIsActive;
    this.actionRequest.emit(this.budgetBoardIsActive);
  }

  endAction() {
    this.budgetBoardIsActive = false;
    this.actionRequest.emit(this.budgetBoardIsActive);
  }

}

