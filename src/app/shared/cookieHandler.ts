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
  localStorage.setItem('userId', userId.toString());
}

export function saveTOKEN(TOKEN: string): void {
  localStorage.setItem('TOKEN', TOKEN);
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

