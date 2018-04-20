function saveCookie(playerId: number, token: string, gameId: number): void{
  localStorage.setItem("playerId",playerId.toString());
  localStorage.setItem("gameId", gameId.toString());
  localStorage.setItem("token", token);
}

function readId(): number{
  return Number(localStorage.getItem("playerId"));
}

function readToken(): string{
  return localStorage.getItem("token");
}

function readGameId(): number{
  return Number(localStorage.getItem("gameId"));
}

