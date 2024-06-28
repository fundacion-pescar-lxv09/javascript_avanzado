export class Piece {
    constructor(color, row, col){
        this.color = color;
        this.row = row
        this.col = col    
        this.isKing = false;
    }
    makeKing(){
        this.isKing = true;
    }
    isValidMove(x,y){
        if(this.isKing) return true
        else return (
        (x == (this.row + 1) || x == (this.row - 1)) && 
        (y == (this.col + 1) || y == (this.col - 1))
    )}
    movePiece(nextRow,nextCol){
        if (this.isValidMove(nextRow,nextCol)) {
            this.row = nextRow
            this.col = nextCol
            return true
        }
        else return false;
    }
    render(img){
        return `<img class="${this.color}" src="${img}" data-row="${this.row}" data-col="${this.col}" alt="pieza ${this.color} ${this.row},${this.col}" draggable>`
    }
}