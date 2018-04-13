import {Component, OnInit} from '@angular/core';
import {ROUTES} from '../../mock-routes';
import {MAINMENUBUTTONS} from '../../button-database';

@Component({
  selector: 'app-host-buttons',
  templateUrl: './host-buttons.component.html',
  styleUrls: ['./host-buttons.component.css']
})
export class HostButtonsComponent implements OnInit {
  routes = ROUTES;
  hostButton = MAINMENUBUTTONS.find(obj => obj.id === 'menubutton-hostgame');

  constructor() {
  }

  ngOnInit() {
  }

}

// ToDO: In Template set button position automatically
// ToDO: In Template das, was von allen button Typen geshared wird, in eine Klasse



