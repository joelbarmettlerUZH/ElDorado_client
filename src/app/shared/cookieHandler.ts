import {User} from './models/User';

export function savePlayer(playerId: number, token: string, gameId: number): void {
  localStorage.setItem('playerId', playerId.toString());
  localStorage.setItem('gameId', gameId.toString());
  localStorage.setItem('token', token);
}

export function saveUser(user: User): void {
  localStorage.setItem('meUser', JSON.stringify(user));
}

export function saveUserId(userId: number): void {
  while (Number(localStorage.getItem('userId')) !== userId) {
    localStorage.setItem('userId', userId.toString());
  }
}

export function savePlayerId(playerId: number): void {
  while (Number(localStorage.getItem('playerId')) !== playerId) {
    localStorage.setItem('playerId', playerId.toString());
  }
}

export function saveRoomId(roomId: number): void {
  while (Number(localStorage.getItem('roomId')) !== roomId) {
    localStorage.setItem('roomId', roomId.toString());
  }
}

export function saveGameId(gameId: number): void {
  while (Number(localStorage.getItem('gameId')) !== gameId) {
    localStorage.setItem('gameId', gameId.toString());
  }
}


export function saveTOKEN(TOKEN: string): void {
  while (localStorage.getItem('token') !== TOKEN) {
    localStorage.setItem('token', TOKEN);
  }
}

export function readId(): number {
  return Number(localStorage.getItem('playerId'));
}

export function readToken(): string {
  return localStorage.getItem('token');
}

export function readGameId(): number {
  return Number(localStorage.getItem('gameId'));
}

