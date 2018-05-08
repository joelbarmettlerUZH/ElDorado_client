import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Board} from '../../../shared/models/board';
import {Hexspace} from '../../../shared/models/hexSpace';
import {MoveWrapper} from '../../../shared/models/MoveWrapper';
import {PlayingPiece} from '../../../shared/models/PlayingPiece';
import {Point} from '../../../shared/models/point';
import {Card} from '../../../shared/models/Card';
import {PlayerService} from '../../../shared/services/player.service';
import {GameService} from '../../../shared/services/game.service';
import {HexspaceComponent} from '../hexspace/hexspace.component';
import {Player} from '../../../shared/models/Player';
import {Game} from '../../../shared/models/Game';
import {CardsService} from '../../../shared/services/cards.service';
import {Subscription} from 'rxjs/Subscription';
import {Blockade} from '../../../shared/models/Blockade';

declare var $: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})

export class BoardComponent implements OnInit, AfterViewInit {
  public hexagons: Hexspace[];
  public game: Game;
  public xDim: number;
  public yDim: number;
  public yWidth: number;
  public board: Board;
  public players: Player[] = [];
  public hexComponents: HexspaceComponent[] = [];
  public selectedPlayingPiece: PlayingPiece = null;
  public selectedCards: Card[] = [];
  private reachableHex: HexspaceComponent[] = [];
  private boardReady = false;
  private removableBlockades: number[];

  private blockades: Blockade[] = [];
  private removable: Blockade[] = [];

  private playerSubscription: Subscription;
  private cardSucbscription: Subscription;

  @ViewChildren('hexspaceComponent') hexComponent: QueryList<HexspaceComponent>;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private cardsService: CardsService,
  ) {
    this.gameService.playersSub.subscribe(
      () => {
        try {
          if (this.boardReady) {
            this.updatePlayers();
          }
        } catch (e) {
          console.log('-Board Update: Players not ready yet');
        }
      }
    );
    this.gameService.currentSub.subscribe(
      () => {
        try {
          if (this.boardReady) {
            this.updatePlayers();
          }
          this.selectedPlayingPiece = null;
          this.reachableHex = [];
        } catch (e) {
          console.log('-Board Update: Players not ready yet');
        }
      }
    );
    this.cardsService.selectedardsSub.subscribe(
      () => {
        try {
          if (this.boardReady) {
            this.updateCards();
          }
        } catch (e) {
          console.log('-Board update: Cards not ready yet');
        }
      }
    );
    this.gameService.blockadesSub.subscribe(
      blockades => {
        try {
          this.blockades = blockades;
          this.setBlockades();
        } catch (e) {
          console.log('-Board update: Blockades not ready yet');
        }
      }
    );
    this.playerService.removableBlockadesSub.subscribe(
      removableBlockades => {
        try {
          this.removableBlockades = removableBlockades;
          this.setBlockades();
        } catch (e) {
          console.log("-Board update: Removable blockades not ready yet");
        }
      }
    );
  }


  ngOnInit() {
    this.gameService.rawGetter().subscribe(
      res => {
        const game: Game = res;
        this.game = game;
        this.board = game.pathMatrix;
        this.hexagons = this.board.matrixArray;
        this.xDim = this.board.xdim;
        this.yDim = this.board.ydim;
        this.yWidth = (100 / this.yDim);
        this.yWidth = Math.round(((100 - this.yWidth / 2) / this.yDim) * 100) / 100;
        this.panZoom();
      }
    );
  }

  // Takes a Point object and returns an index
  pointToIndex(point: Point) {
    return (point.x * this.yDim) + point.y;
  }

  // Module responsible for dragging and zooming the main board
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

  // Takes an array of cards and finds all hexspaces on which you can move
  getWay($event) {
    console.log('-Board: Knowing da wea');
    this.selectedPlayingPiece = $event;
    this.removable = [];
    const cards: Card[] = this.cardsService.getSelectedCards();
    if (cards.length < 1) {
      console.log('-Board: Can not get da wae since no cards are selected');
      return;
    }
    console.log('-Board: Path cards are: ', cards);
    this.selectedCards = cards;
    this.resetReachable();
    console.log('-Board: Path Playing piece is: ', $event);
    const playingPieceId = this.selectedPlayingPiece.playingPieceId;
    const moveWrapper: MoveWrapper = new MoveWrapper(cards, null);
    console.log('-Board: Finding path with movewarpper: ', moveWrapper);
    this.playerService.findPath(moveWrapper, playingPieceId).subscribe(
      response => {
        const hexSpaces: Hexspace[] = response;
        console.log('-Board: Reaching hexspaces: ', hexSpaces);
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

  move($event) {
    this.removable = [];
    const cards = this.cardsService.getSelectedCards();
    if (cards.length < 1) {
      console.log('-Board: Can not move since no cards are selected');
      return;
    }
    const hexSpace: Hexspace = $event;
    const playingPieceId = this.selectedPlayingPiece.playingPieceId;
    console.log('-Board: Moving with cards', cards);
    this.playerService.move(new MoveWrapper(cards, hexSpace), playingPieceId).subscribe(
      response => {
        const removableBlockade: Blockade[] = response;
        console.log('-Board: Moved. Now able to remove the following blockades: ', removableBlockade);
        this.setRemovable(false);
        this.removable = removableBlockade;
        this.setRemovable(true);
      }
    );
    this.resetReachable();
    cards.forEach(
      card => {
        this.cardsService.removeHandCard(card);
      }
    );
    this.selectedPlayingPiece = null;
    this.resetReachable();
  }

  removeBlockade($event) {
    const hex: Hexspace = $event;
    let block: Blockade;
    console.log(hex);
    this.blockades.forEach(
      blockade => {
        blockade.spaces.forEach(
          space => {
            if (this.pointToIndex(space.point) === this.pointToIndex(hex.point)) {
              console.log('-Board: Found blockade to remove');
              block = blockade;
            }
          }
        );
      }
    );
    console.log('-Board: Request to remove blockade received with blockade ', block);
    this.playerService.removeBlockade(block).subscribe(
      () => {
      }
    );
  }

  updateCards() {
    const newCards: Card[] = this.cardsService.getSelectedCards();
    if (newCards.length !== this.selectedCards.length) {
      console.log('-Card update: Change detected: ', this.selectedCards, newCards);
      this.selectedCards = newCards;
      if (newCards.length === 0) {
        this.resetReachable();
      } else {
        console.log('-Card update: New cards selected, getting da wae');
        if (this.selectedPlayingPiece !== null) {
          console.log('-Card update: Getting wae again with old playing piece');
          this.getWay(this.selectedPlayingPiece);
        }
      }
    }
  }

  updatePlayers() {
    let updatedPlayers: Player[] = [];
    try {
      updatedPlayers = this.gameService.getPlayers();
    } catch (e) {
      console.log('-Board: Game not ready yet, can not update players');
      return;
    }
    console.log('-Player update: changed their state, updating them now');
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
            const current: Player = this.gameService.getCurrent();
            if (current.playerId === player.playerId) {
              hex.setCurrent(true);
            } else {
              hex.setCurrent(false);
            }
          }
        );
      }
    );
    this.players = updatedPlayers;
  }

  setRemovable(remove: boolean) {
    this.removable.forEach(
      blockade => {
        blockade.spaces.forEach(
          hex => {
            this.findHexComponent(hex).isRemovable = remove;
          }
        );
      }
    );
  }

  setBlockades() {
    if (typeof this.blockades === 'undefined') {
      this.blockades = this.gameService.getBlockades();
    }
    this.blockades.forEach(
      blockade => {
        blockade.spaces.forEach(
          space => {
            const hex: HexspaceComponent = this.findHexComponent(space);
            hex.isBlockade = true;
            hex.isActive = space.strength > 0;
            if (blockade.blockadeId >= 1000) {
              hex.orientation = 'HORIZONTAL';
            }
            hex.isRemovable = (this.removableBlockades.indexOf(blockade.blockadeId) >= 0);
          }
        );
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

  initBoard() {
    this.gameService.rawGetter().subscribe(
      response => {
        this.game = response;
        if (this.hexComponent.toArray().length > 0) {
          console.log('-Board: Recognized change in Board');
          this.hexComponents = this.hexComponent.toArray();
          console.log(this.hexComponents.length + ' of ' + this.xDim * this.yDim);
          if (this.hexComponents.length === this.xDim * this.yDim) {
            console.log('-Board: Setting playing pieces now');
            this.boardReady = true;
            this.updatePlayers();
            this.setBlockades();
          }
        }
      }
    );
  }

  ngAfterViewInit() {
    console.log('-Board: Length of combined hexSpaces is: ' + this.hexComponent.toArray().length);
    this.initBoard();
    this.hexComponent.changes.subscribe(
      hex => {
        this.initBoard();
      });
    // this.updatePlayers();
  }

}

