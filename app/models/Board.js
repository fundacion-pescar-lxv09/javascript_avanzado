import { Piece } from "./Piece.js"
import { d, odd, even, checkCoord } from "../utils.js";
export class Board {
    constructor(rows=8,cols=8){
        this.board = []
        this.rows = rows;
        this.cols = cols;
    }
    getBoard(c1,c2){
        this.board = [];
        for(let r = 0; r < this.rows; r++){
            this.board.push([]);
            for(let c = 0; c < this.cols; c++){
                const color = r < 3 ? c1 : c2
                this.board[r].push( ( (r<3 || r>4) && checkCoord(r,c)) ? new Piece(color,r,c) : null)
            }
        }
    }
    createBoard(element,img){
        const board = d.createElement('div');
        board.setAttribute("class", "board");
        this.board.map((row,x)=> row.map((c,y) => {
            const cell = d.createElement('div')
            cell.setAttribute("class", checkCoord(x,y)?"dark":"light")
            cell.dataset.row = x;
            cell.dataset.col = y;
            cell.innerHTML= c?.render(img) ?? ''
            board.appendChild(cell);
        }))
        element.appendChild(board)
    }
    updateBoard (prevRow, prevCol, nextRow, nextCol){
        [ this.board[nextRow][nextCol],this.board[prevRow][prevCol] ] = 
        [ this.board[prevRow][prevCol],this.board[nextRow][nextCol] ]
    }
}