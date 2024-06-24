const d = document;
const root = d.getElementById('root');
const img = "assets/checker.svg";

const checkCoord = (row, col) => 
    (row % 2 === 0 && col % 2 === 0) || 
    (row % 2 === 1 && col % 2 === 1)

class Board {
    board = [];
    constructor(cols, rows){
        this.cols = cols;
        this.rows = rows;
    }
    getBoard(){
        for(let r = 0; r < this.rows; r++){
            this.board.push([]);
            for(let c = 0; c < this.cols; c++){
                switch(true){
                case r < 3: {
                    checkCoord(r,c) ? this.board[r].push("black") : this.board[r].push(null)
                break;
                }
                case r > 4: {
                    checkCoord(r,c) ? this.board[r].push("white") : this.board[r].push(null)
                break;
                }
                default: this.board[r].push(null);
                }
            }
        }
    }
    createBoard(element){
        const board = d.createElement('div');
        board.setAttribute("class", "board");
        this.board.map((row,rowIndex)=> row.map((c,cellIndex) => {
            const cell = d.createElement('div')
            if (rowIndex % 2 === 0) 
            cell.setAttribute("class", cellIndex % 2 === 0 ? "dark" : "light")
            if(rowIndex % 2 === 1){
            cell.setAttribute("class", cellIndex % 2 === 0 ? "light" : "dark")
            }
            cell.setAttribute("data-row",rowIndex);
            cell.setAttribute("data-col",cellIndex);
            cell.innerHTML=c
            board.appendChild(cell);
        }))
        element.appendChild(board)
    }
}

const game = new Board(8,8);
game.getBoard()
game.createBoard(root);