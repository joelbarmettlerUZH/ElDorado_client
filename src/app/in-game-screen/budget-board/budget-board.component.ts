import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-budget-board',
  templateUrl: './budget-board.component.html',
  styleUrls: ['./budget-board.component.css']
})
export class BudgetBoardComponent implements OnInit {
  @Output() endActionRequest = new EventEmitter<boolean>();
  public fadedIn: boolean;


  constructor() {
  }

  ngOnInit() {
    this.fadedIn = false;
  }

  onSelect() {
    console.log('Is hidden: ' + this.fadedIn);
    this.fadedIn = !this.fadedIn;
    console.log('Is hidden: ' + this.fadedIn);
  }

  endAction() {
    this.endActionRequest.emit(false);
  }


}

