import {Component, Input, OnInit} from '@angular/core';
import {Hexspace} from '../../../shared/models/hexSpace';

@Component({
  selector: 'app-hexspace',
  templateUrl: './hexspace.component.html',
  styleUrls: ['./hexspace.component.css']
})
export class HexspaceComponent implements OnInit {

  @Input()
  public xDim: number;

  @Input()
  public HexSpace: Hexspace;

  @Input()
  public xwidth: number;

  public color: string;

  public strength: number;

  public index: number;

  constructor() { }

  ngOnInit() {

    this.color = this.HexSpace.color;
    this.index = (this.HexSpace.point.y * this.xDim) + this.HexSpace.point.x;
    this.strength = this.HexSpace.strength;

    console.log(this.color);
  }

}
