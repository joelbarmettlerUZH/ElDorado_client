import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Hexspace} from '../../../shared/models/hexSpace';
import {Player} from '../../../shared/models/Player';
import {PlayingPiece} from '../../../shared/models/PlayingPiece';
import {Point} from '../../../shared/models/point';
import {SettingsService} from '../../../shared/services/settings.service';
import {Subscription} from 'rxjs/Subscription';
import {SoundService} from '../../../shared/services/sound.service';

@Component({
  selector: 'app-hexspace',
  templateUrl: './hexspace.component.html',
  styleUrls: ['./hexspace.component.css'],
})
export class HexspaceComponent implements OnInit, OnDestroy {

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
  public orientation: number;
  public isActive = true;
  public isRemovable = false;

  public color: string;
  public strength: number;
  public index: number;

  public showPathfinder: Boolean;
  private pathfinderSubscription: Subscription;

  public showCurrent: Boolean;
  private showCurrentSubscription: Subscription;

  constructor(private settingsService: SettingsService, private sound: SoundService) {
  }

  ngOnInit() {
    this.pathfinderSubscription = this.settingsService.showPathfinderSub.subscribe(
      show => {
        this.showPathfinder = show;
      }
    );

    this.showCurrentSubscription = this.settingsService.showCurrentSub.subscribe(
      show => {
        this.showCurrent = show;
      }
    );

    this.color = this.HexSpace.color;
    this.index = (this.HexSpace.point.x * this.yDim) + this.HexSpace.point.y;
    this.strength = this.HexSpace.strength;
    // console.log(this.color);
  }

  setReachable(reachable: boolean) {
    this.isReachable = reachable;
  }

  moveTo() {
    console.log('-Hespace: User requests moving to ' + this.index);
    this.move.emit(this.HexSpace);
  }

  removeBlockade() {
    console.log('-Hexspace: User requests to remove blockadeEvent ' + this.index);
    this.blockadeEvent.emit(this.HexSpace);
  }

  setCurrent(current: boolean) {
    this.isCurrent = current;
  }

  findPath() {
    console.log('-HexSpace: User requests pathfinder');
    // console.log(this.player);
    let playingPiece: PlayingPiece;
    this.player.playingPieces.forEach(
      pP => {
        if (this.pointToIndex(pP.standsOn.point) === this.pointToIndex(this.HexSpace.point)) {
          playingPiece = pP;
          console.log('-HexSpace: Playingpiece is ' + playingPiece.playingPieceId);
          this.path.emit(playingPiece);
        }
      });
  }

  pointToIndex(point: Point) {
    return (point.x * this.yDim) + point.y;
  }

  movesOn(player: Player) {
    // console.log('Player moves on hexspace', player, this.HexSpace);
    this.player = player;
    this.isPlayingPiece = true;
  }

  movesOff() {
    // console.log('Player moves of hexspace', this.player, this.HexSpace);
    this.player = null;
    this.isPlayingPiece = false;
  }

  isValid() {
    const valid = this.isCurrent && this.player.playerId === Number(localStorage.getItem('playerId'));
    console.log('-HexSpace: User validating: ' + valid);
    return valid;
  }

  performAction() {
    if (this.isReachable) {
      this.sound.move();
      this.moveTo();
    }
    if (this.isPlayingPiece && this.isValid()) {
      this.sound.player();
      this.findPath();
    }
    if (this.isBlockade && this.isRemovable) {
      this.sound.collect();
      this.removeBlockade();
    }
  }

  ngOnDestroy() {
    this.pathfinderSubscription.unsubscribe();
    this.showCurrentSubscription.unsubscribe();
  }
}
