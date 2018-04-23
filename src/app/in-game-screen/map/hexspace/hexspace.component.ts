import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hexspace} from '../../../shared/models/hexSpace';
import {Player} from '../../../shared/models/Player';
import {MoveWrapper} from '../../../shared/models/MoveWrapper';
import {PlayingPiece} from '../../../shared/models/PlayingPiece';
import {Point} from '../../../shared/models/point';
import {SubscriptionLoggable} from 'rxjs/testing/SubscriptionLoggable';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {PlayerService} from '../../../shared/services/player.service';
import {Blockade} from '../../../shared/models/Blockade';

@Component({
  selector: 'app-hexspace',
  templateUrl: './hexspace.component.html',
  styleUrls: ['./hexspace.component.css'],
})
export class HexspaceComponent implements OnInit {

  @Input()
  public yDim: number;

  @Input()
  public HexSpace: Hexspace;

  @Input()
  public ywidth: number;

  @Output()
  public path = new EventEmitter<PlayingPiece>();

  @Output()
  public move = new EventEmitter<Hexspace>();

  @Output()
  public blockadeEvent = new EventEmitter<Hexspace>();

  public player: Player;

  public isReachable = false;
  public isPlayingPiece = false;
  public isCurrent = false;
  public isBlockade = false;
  public isActive = true;
  public isRemovable = false;

  public color: string;
  public strength: number;
  public index: number;

  constructor() {
  }

  ngOnInit() {

    this.color = this.HexSpace.color;
    this.index = (this.HexSpace.point.x * this.yDim) + this.HexSpace.point.y;
    this.strength = this.HexSpace.strength;
    console.log(this.color);
  }

  setReachable(reachable: boolean) {
    this.isReachable = reachable;
  }

  moveTo() {
    console.log('User requests moving to ' + this.index);
    this.move.emit(this.HexSpace);
  }

  removeBlockade() {
    console.log('User requests to remove blockadeEvent ' + this.index);
    this.blockadeEvent.emit(this.HexSpace);
  }

  setCurrent(current: boolean) {
    this.isCurrent = current;
  }

  findPath() {
    // TODO: What halppens if i click on a playing piece of another player?
    console.log(this.player);
    let playingPiece: PlayingPiece;
    this.player.playingPieces.forEach(
      pP => {
        if (this.pointToIndex(pP.standsOn.point) === this.pointToIndex(this.HexSpace.point)) {
          playingPiece = pP;
        }
      });
    console.log('Playingpiece is ' + playingPiece.playingPieceId);
    this.path.emit(playingPiece);
  }

  pointToIndex(point: Point) {
    return (point.x * this.yDim) + point.y;
  }

  movesOn(player: Player) {
    console.log('Player moves on hexspace', player, this.HexSpace);
    this.player = player;
    this.isPlayingPiece = true;
  }

  movesOff() {
    console.log('Player moves of hexspace', this.player, this.HexSpace);
    this.player = null;
    this.isPlayingPiece = false;
  }

  isValid() {
    return this.isCurrent && this.player.playerId
      === Number(localStorage.getItem('playerId'));
  }

  performAction() {
    if (this.isPlayingPiece && this.isValid()) {
      this.findPath();
    }
    if (this.isReachable && this.isValid()) {
      this.moveTo();
    }
    if (this.isBlockade && this.isRemovable && this.isValid()) {
      this.removeBlockade();
    }
  }

}
