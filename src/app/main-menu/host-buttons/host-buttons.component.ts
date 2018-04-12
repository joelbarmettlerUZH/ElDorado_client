import {Component, OnInit} from '@angular/core';
import {ROUTES} from '../../mock-routes';

@Component({
  selector: 'app-host-buttons',
  templateUrl: './host-buttons.component.html',
  styleUrls: ['./host-buttons.component.css']
})
export class HostButtonsComponent implements OnInit {
  routes = ROUTES;
  constructor() {
  }

  ngOnInit() {
  }

}

// ToDO: In Template set button position automatically

