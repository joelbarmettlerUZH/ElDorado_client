import {Component, Input, OnInit} from '@angular/core';
import {PollCharacter} from '../../shared/models/pollCharacter';

@Component({
  selector: 'app-default-character',
  templateUrl: './default-character.component.html',
  styleUrls: ['./default-character.component.css']
})
export class DefaultCharacterComponent implements OnInit {

  @Input()
  character: PollCharacter;

  constructor() { }

  ngOnInit() {
    console.log('character', this.character.name);
  }

}
