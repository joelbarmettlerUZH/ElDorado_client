import {Injectable} from '@angular/core';
import {Player} from '../models/Player';
import {PlayerService} from './player.service';


// Service as alternative to pull all the time the current number of coins

@Injectable()
export class CoinsService {
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  private ownPlayer: Player;
  private ownCoinNumber: number;

  constructor(private playerService: PlayerService) {
    // set local ownPlayer once to retrieve its number of coins
    this.getOwnPlayer();
    // set local current number of coins of own player to the initial number of coins defined in the backend
    this.ownCoinNumber = this.getLocalCoinNumber();
  }

  // REST: GET | set local ownPlayer once to retrieve its number of coins
  getOwnPlayer(): void {
    this.playerService.getPlayer(this.ownPlayerId)
      .subscribe(response => {
        this.ownPlayer = response;
      });
  }

  // retrieve local current number of coins of own player
  getLocalCoinNumber(): number {
    return this.ownPlayer.coins;
  }

  // update local current number of coins of own player
  // so that it is conform with the backend
  updateLocalCoinNumber(coinNumber): void {
    this.ownCoinNumber = coinNumber;
  }
}
