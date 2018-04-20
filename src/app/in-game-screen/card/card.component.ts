import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {Player} from '../../shared/models/Player';
import {PlayerService} from '../../shared/services/player.service';
// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public card: Card;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
  }

  sell(){
    this.playerService.sell(this.card).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  discard(){

  }

}
