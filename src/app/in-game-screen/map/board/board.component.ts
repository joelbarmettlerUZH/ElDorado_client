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
import {savePlayer, saveUserId} from '../../../shared/cookieHandler';

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
  public playingPieces: PlayingPiece[] = [];
  public hexComponents: HexspaceComponent[] = [];
  public selectedPlayingPiece: PlayingPiece = null;
  public selectedCards: Card[] = [];
  private reachableHex: HexspaceComponent[] = [];

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
  }


  ngOnInit() {
     // savePlayer(6, 'TESTTOKEN', 4); // Creates a local storage value
     // saveUserId(6);

    this.game = this.gameService.getGame();
    this.updateGame(this.game);
    this.xDim = this.board.xdim;
    this.yDim = this.board.ydim;
    this.yWidth = (100 / this.yDim);
    this.yWidth = Math.round(((100 - this.yWidth / 2) / this.yDim) * 100) / 100;
    this.panZoom();
    /*
    this.gameService.getGame().subscribe(
      response => {
        this.updateGame(response);
        this.xDim = this.board.xdim;
        this.yDim = this.board.ydim;
        this.yWidth = (100 / this.yDim);
        this.yWidth = Math.round(((100 - this.yWidth / 2) / this.yDim) * 100) / 100;
        this.panZoom();
      });
      */
  }

  // Takes a Point object and returns an index
  pointToIndex(point: Point) {
    return (point.x * this.yDim) + point.y;
  }

  // Module responsible for dragging and zooming the main board
  panZoom() {
    const $section = $('#board');
    const $panzoom = $section.find('.panzoom').panzoom();
    $panzoom.parent().on('mousewheel.focal', function (e) {
      e.preventDefault();
      const delta = e.delta || e.originalEvent.wheelDelta;
      const zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      $panzoom.panzoom('zoom', zoomOut, {
        minScale: 0.4,
        maxScale: 0.5,
        increment: 0.13,
        animate: false,
        // Animation duration (ms)
        duration: 200,
        // CSS easing used for scale transition
        easing: 'ease-in-out',
        focal: e
      });
    });
  }

  // Takes an array of cards and finds all hexspaces on which you can move
  getWay($event) {
    console.log('Knowing da wea');
    this.selectedPlayingPiece = $event;
    this.removable = [];
    const cards: Card[] = this.cardsService.getSelectedCards();
    if (cards.length < 1) {
      console.log('Can not get da wae since no cards are selected');
      return;
    }
    console.log('Path cards are: ', cards);
    this.selectedCards = cards;
    this.resetReachable();
    console.log('Path Playing piece is: ', $event);
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

  move($event) {
    this.removable = [];
    const cards = this.cardsService.getSelectedCards();
    if (cards.length < 1) {
      console.log('Can not move since no cards are selected');
      return;
    }
    const hexSpace: Hexspace = $event;
    const playingPieceId = this.selectedPlayingPiece.playingPieceId;
    console.log(cards);
    this.playerService.move(new MoveWrapper(cards, hexSpace), playingPieceId).subscribe(
      response => {
        const removableBlockade: Blockade[] = response;
        console.log('Moved. Now able to remove the following blockades: ', removableBlockade);
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
  }

  removeBlockade($event) {
    const hex: HexspaceComponent = $event;
    let block: Blockade;
    this.blockades.forEach(
      blockade => {
        blockade.spaces.forEach(
          space => {
            if (this.pointToIndex(space.point) === this.pointToIndex(hex.HexSpace.point)) {
              console.log('Found blockade to remove');
              block = blockade;
            }
          }
        );
      }
    );
    console.log('Request to remove blockade received with blockade ', block);
    this.playerService.removeBlockade(block).subscribe(
      res => {
      }
    );
  }

  updateGame(game: Game) {
    // this.game = game;
    this.board = this.game.pathMatrix;
    this.hexagons = this.board.matrixArray;
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

  updatePlayers(initial: boolean = false) {
    if (!initial && JSON.stringify(this.gameService.getPlayingPieces()) === JSON.stringify(this.playingPieces)) {
      return;
    }
    console.log('-Player update: changed their state, updating them now');
    this.playingPieces.forEach(
      playingPiece => {
        const hex: HexspaceComponent = this.hexComponents[this.pointToIndex(playingPiece.standsOn.point)];
        hex.movesOff();
        hex.setCurrent(false);
      });
    // Have to loop over the players to set the playing pieces to current or not
    this.gameService.getPlayers().forEach(
      player => {
        player.playingPieces.forEach(
          playingPiece => {
            const hex: HexspaceComponent = this.hexComponents[this.pointToIndex(playingPiece.standsOn.point)];
            hex.movesOn(player);
            if (this.gameService.getCurrent().playerId === player.playerId) {
              hex.setCurrent(true);
            } else {
              hex.setCurrent(false);
            }
          }
        );
      }
    );
    this.players = this.gameService.getPlayers();
    this.updateBlockades();
      /*
      this.gameService.getPlayers().subscribe(
        response => {
          const updatedPlayers: Player[] = response;
          if (!initial && JSON.stringify(updatedPlayers) === JSON.stringify(this.players)) {
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
                  this.gameService.getCurrent().subscribe(
                    res => {
                      const current: Player = res;
                      if (current.playerId === player.playerId) {
                        hex.setCurrent(true);
                      } else {
                        hex.setCurrent(false);
                      }
                    }
                  );

                }
              );
            }
          );
          this.players = updatedPlayers;
          this.updateBlockades();
        }
      );*/
  }

  updateBlockades(initial: boolean = false) {
    const newBlockades: Blockade[] = this.gameService.getBlockades();
    if (!initial && (JSON.stringify(newBlockades) === JSON.stringify(this.blockades))) {
      console.log('-Blockades update: did not change, going on as before.');
      return;
    }
    console.log('-Blockades update: DID change, updating them');
    this.setBlockades(false);
    this.blockades = newBlockades;
    this.setBlockades(true);
    /*
    this.gameService.getBlockades().subscribe(
      response => {
        const newBlockades: Blockade[] = response;
        if ((JSON.stringify(newBlockades) === JSON.stringify(this.blockades)) && !initial) {
          console.log('-Blockades update: did not change, going on as before.');
          return;
        }
        console.log('-Blockades update: DID change, updating them');
        this.setBlockades(false);
        this.blockades = newBlockades;
        this.setBlockades(true);
      }
    );
    */
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

  setBlockades(active: boolean) {
    console.log('Setting blockades to ' + active);
    this.blockades.forEach(
      blockade => {
        blockade.spaces.forEach(
          space => {
            const hex: HexspaceComponent = this.findHexComponent(space);
            hex.isBlockade = true;
            hex.isRemovable = false;
            hex.isActive = active;
            hex.isRemovable = (this.removable.indexOf(blockade) !== -1);
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
    if (this.hexComponent.toArray().length > 0) {
      console.log('Change');
      this.hexComponents = this.hexComponent.toArray();
      console.log(this.hexComponents.length + ' of ' + this.xDim * this.yDim);
      if (this.hexComponents.length === this.xDim * this.yDim) {
        console.log('Setting playing pieces now');
        this.updatePlayers(true);
        this.playerSubscription = Observable.interval(1000).subscribe(
          res => {
            this.updatePlayers();
          });
        this.cardSucbscription = Observable.interval(1000).subscribe(
          res => {
            this.updateCards();
          }
        );
      }
    }
  }

  ngAfterViewInit() {
    console.log('Waduhek length is ' + this.hexComponent.toArray().length);
    this.initBoard();
    this.hexComponent.changes.subscribe(
      hex => {
        this.initBoard();
      });
  }

}

