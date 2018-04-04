import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  isFadedIn: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isFadedIn = false;
  }

  fadeInOut() {
    // if (this.isFadedIn){
    //   this.fadeOut();
    // } else{
    //   this.fadeIn();
    // }
  }

  // private fadeOut() {
  //
  // }
  //
  // private fadeIn() {
  //
  // }

}
