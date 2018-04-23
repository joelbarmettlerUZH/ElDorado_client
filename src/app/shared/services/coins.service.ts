import {Injectable} from '@angular/core';
import {Player} from '../models/Player';
import {PlayerService} from './player.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// Service as alternative to pull all the time the current number of coins

@Injectable()
export class CoinsService {
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  private ownPlayer: Player;
  private tempOwnCoinNumber: number;
  private ownCoinNumber = new BehaviorSubject<number>(0);


  constructor(private playerService: PlayerService) {
    // set local ownPlayer once to retrieve its number of coins
    this.getOwnPlayer();
  }

  // REST: GET | set local ownPlayer once to retrieve its number of coins
  getOwnPlayer(): void {
    this.playerService.getPlayer(this.ownPlayerId)
      .subscribe(response => {
        this.ownPlayer = response;
        // set local current number of coins of own player to the initial number of coins defined in the backend
        this.tempOwnCoinNumber = this.ownPlayer.coins;
        console.log('CoinsService | temp coin number: ' + this.ownCoinNumber);
        this.updateLocalCoinNumber(this.tempOwnCoinNumber);
      });
  }


  // retrieve local current number of coins of own player
  getLocalCoinNumber() {
    return this.ownCoinNumber.asObservable();
  }


  // update local current number of coins of own player
  // so that it is conform with the backend
  updateLocalCoinNumber(coinNumber): void {
    this.ownCoinNumber.next(coinNumber);
  }
}
