export class CreateRoom {
  name: string;
  boardId: number;

  constructor(name: string, boardId: number){
    this.name = name;
    this.boardId = boardId;
  }
}
