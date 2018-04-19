import {Component, Input, OnInit} from '@angular/core';
import {Hexspace} from '../../../shared/models/hexSpace';

@Component({
  selector: 'app-hexspace',
  templateUrl: './hexspace.component.html',
  styleUrls: ['./hexspace.component.css']
})
export class HexspaceComponent implements OnInit {

  @Input()
  public yDim: number;

  @Input()
  public HexSpace: Hexspace;

  @Input()
  public ywidth: number;

  public color: string;

  public strength: number;

  public index: number;

  constructor() { }

  ngOnInit() {

    this.color = this.HexSpace.color;
    this.index = (this.HexSpace.point.x * this.yDim) + this.HexSpace.point.y;
    this.strength = this.HexSpace.strength;

    console.log(this.color);
  }

}
