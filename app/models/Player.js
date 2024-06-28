export class Player{
    constructor(name, color = "black"){
        this.name = name;
        this.color = color;
        this.isTurn = false;
        this.pieces = 12;
    }
    changeTurn(){
        this.isTurn = !this.isTurn;
    }
    pieceLost(){
        return --this.pieces;
    }
    piecesReset(){
        this.pieces = 12
    }
}