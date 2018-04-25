import {Injectable} from '@angular/core';
import {Player} from '../models/Player';
import {PlayerService} from './player.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

// Service as alternative to pull all the time the isCurrent number of coins

@Injectable()
export class CoinsService {
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  private ownPlayer: Player;
  private coinNumber: number;
  private coinSubscription: Subscription;


  constructor(private playerService: PlayerService) {
    // set local ownPlayer once to retrieve its number of coins
    this.getOwnPlayer();
  }

  // REST: GET | set local ownPlayer once to retrieve its number of coins
  getOwnPlayer(): void {
    this.playerService.rawGetter().subscribe(
      res => {
        const players: Player[] = res;
        this.ownPlayer = players.filter(player => player.playerId === Number(localStorage.getItem('playerId')))[0];
        // set local isCurrent number of coins of own player to the initial number of coins defined in the backend
        this.coinNumber = this.ownPlayer.coins;
        this.coinSubscription = Observable.interval(1000).subscribe(y => this.updateCoins );
      }
    );
  }

  updateCoins() {
    this.coinNumber = this.playerService.getPlayer().coins;
  }

  getCoins() {
    return this.coinNumber;
  }

}
