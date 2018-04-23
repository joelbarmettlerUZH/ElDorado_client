import {AfterContentInit, AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Board} from '../../../shared/models/board';
import {by} from 'protractor';
import {Hexspace} from '../../../shared/models/hexSpace';
import {MoveWrapper} from '../../../shared/models/MoveWrapper';
import {PlayingPiece} from '../../../shared/models/PlayingPiece';
import {Point} from '../../../shared/models/point';
import {Card} from '../../../shared/models/Card';
import {PlayerService} from '../../../shared/services/player.service';
import {savePlayer, saveTOKEN} from '../../../shared/cookieHandler';
import {GameService} from '../../../shared/services/game.service';
import {SelectCharacterComponent} from '../../../main-menu/select-character/select-character.component';
import {HexspaceComponent} from '../hexspace/hexspace.component';
import {Player} from '../../../shared/models/Player';
import {Game} from '../../../shared/models/Game';
import {forEach} from '@angular/router/src/utils/collection';
import {MoveService} from '../../../shared/services/move.service';
import {Subscription} from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, AfterViewInit {
  public hexagons: Hexspace[];
  // public colors: string[];
  public game: Game;
  public xDim: number;
  public yDim: number;
  public yWidth: number;
  public xOffset: number;
  public board: Board;
  public players: Player[] = [];
  public ownPlayingPieces: PlayingPiece[] = [];
  public opponentPlayingPieces: PlayingPiece[] = [];
  public hexComponents: HexspaceComponent[] = [];
  public selectedPlayingPiece: PlayingPiece;
  public selectedCards: Card[] = [];
  private reachableHex: HexspaceComponent[] = [];

  private playerSubscription: Subscription;

  @ViewChildren('hexspaceComponent') hexComponent: QueryList<HexspaceComponent>;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private moveService: MoveService
  ) {
  }


  ngOnInit() {
    savePlayer(2, 'TESTTOKEN', 4);
    saveTOKEN('TESTTOKEN')

    this.gameService.getGame().subscribe(
      response => {
        this.updateGame(response);
        this.xDim = this.board.xdim;
        this.yDim = this.board.ydim;
        this.yWidth = (100 / this.yDim);
        this.yWidth = Math.round(((100 - this.yWidth / 2) / this.yDim) * 100) / 100;
        this.panZoom();
      });
  }

  pointToIndex(point: Point) {
    return (point.x * this.yDim) + point.y;
  }

  panZoom() {
    var $section = $('#board');
    var $panzoom = $section.find('.panzoom').panzoom();
    $panzoom.parent().on('mousewheel.focal', function (e) {
      e.preventDefault();
      var delta = e.delta || e.originalEvent.wheelDelta;
      var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      $panzoom.panzoom('zoom', zoomOut, {
        increment: 0.1,
        animate: false,
        focal: e
      });
    });
  }

  getWay($event) {
    console.log('Knowing da wea');
    this.moveService.getCards().subscribe(
      cards => {
        if (cards.length < 1) {
          return;
        }
        console.log('Path cards are: ', cards);
        this.selectedCards = cards;
        this.resetReachable();
        console.log('Path Playing piece is: ', $event);
        this.selectedPlayingPiece = $event;
        const playingPieceId = this.selectedPlayingPiece.playingPieceId;
        const moveWrapper: MoveWrapper = new MoveWrapper(cards, null);
        console.log('Finding path with movewarpper: ', moveWrapper);
        this.playerService.findPath(moveWrapper, playingPieceId).subscribe(
          response => {
            const hexSpaces: Hexspace[] = response;
            console.log('Reaching hexspaces: ', hexSpaces);
            hexSpaces.forEach(
              hex => {
                const hexComponent = this.findHexComponent(hex);
                hexComponent.setReachable(true);
                this.reachableHex.push(hexComponent);
              }
            );
          }
        );
      }
    );
  }

  move($event) {
    this.moveService.getCards().subscribe(
      cards => {
        if (cards.length < 1) {
          return;
        }
        const hexSpace: Hexspace = $event;
        const playingPieceId = this.selectedPlayingPiece.playingPieceId;
        this.playerService.move(new MoveWrapper(cards, hexSpace), playingPieceId).subscribe(
          response => {
          }
        );
        this.resetReachable();
      });
  }

  updateGame(game: Game) {
    this.game = game;
    this.board = this.game.pathMatrix;
    this.hexagons = this.board.matrixArray;
  }

  updatePlayers(initial: boolean = false) {
    this.gameService.getPlayers().subscribe(
      response => {
        const updatedPlayers: Player[] = response;
        console.log('Getting new data');
        if (!initial && JSON.stringify(updatedPlayers) === JSON.stringify(this.players)) {
          console.log('Players did not change their state');
          return;
        }
        console.log('Players changed their state, updating them now');
        this.resetReachable();

        this.players.forEach(
          player => {
            player.playingPieces.forEach(
              playingPiece => {
                const hex: HexspaceComponent = this.hexComponents[this.pointToIndex(playingPiece.standsOn.point)];
                hex.movesOff();
                hex.setCurrent(false);
              }
            );
          }
        );
        updatedPlayers.forEach(
          player => {
            player.playingPieces.forEach(
              playingPiece => {
                const hex: HexspaceComponent = this.hexComponents[this.pointToIndex(playingPiece.standsOn.point)];
                hex.movesOn(player);
                if (this.game.current.playerId === player.playerId) {
                  hex.setCurrent(true);
                }else {
                  hex.setCurrent(false);
                }
              }
            );
          }
        );
        this.players = updatedPlayers;
      }
    );
  }

  findHexComponent(hexspace: Hexspace): HexspaceComponent {
    const x = hexspace.point.x;
    const y = hexspace.point.y;
    const index = x * this.yDim + y;
    return this.hexComponents[index];
  }

  resetReachable() {
    this.reachableHex.forEach(
      hexComponent => {
        hexComponent.setReachable(false);
      }
    );
    this.reachableHex = [];
  }

  ngAfterViewInit() {
    console.log('Waduhek length is ' + this.hexComponent.toArray().length);
    this.hexComponent.changes.subscribe(
      hex => {
        console.log('Change');
        this.hexComponents = this.hexComponent.toArray();
        console.log(this.hexComponents.length + ' of ' + this.xDim * this.yDim);
        if (this.hexComponents.length == this.xDim * this.yDim) {
          console.log('Setting playing pieces now');
          this.updatePlayers(true);
          this.playerSubscription = Observable.interval(1000).subscribe(y => {
            this.updatePlayers();
          });
        }
      });
    console.log('Going away now, fuck off');
  }

}

