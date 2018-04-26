export class CreateRoom {
  name: string;
  boardnumber: number;

  constructor(name: string, boardId: number){
    this.name = name;
    this.boardnumber = boardId;
  }
}
