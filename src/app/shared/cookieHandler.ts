export function saveCookie(playerId: number, token: string, gameId: number): void{
  localStorage.setItem("playerId",playerId.toString());
  localStorage.setItem("gameId", gameId.toString());
  localStorage.setItem("token", token);
}

export function readId(): number{
  return Number(localStorage.getItem("playerId"));
}

export function readToken(): string{
  return localStorage.getItem("token");
}

export function readGameId(): number{
  return Number(localStorage.getItem("gameId"));
}

