export class CookieHandler {

  static saveCookie(playerId: number, token: string, gameId: number): void{
    // TODO: SAVE playerId and token to cookie or local storage
    localStorage.setItem("playerId",playerId.toString());
    localStorage.setItem("gameId", gameId.toString());
    localStorage.setItem("token", token);
  }

  static readId(): number{
    return Number(localStorage.getItem("playerId"));
  }

  static readToken(): string{
    return localStorage.getItem("token");
  }

  static readGameId(): number{
    return Number(localStorage.getItem("gameId"));
  }

}
