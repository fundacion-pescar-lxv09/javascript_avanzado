const d = document;
const root = d.getElementById('root');
const checker = "assets/checker.svg";

const checkCoord = (row, col) => 
    (row % 2 === 0 && col % 2 === 0) || 
    (row % 2 === 1 && col % 2 === 1)

class Piece {
    isKing = false;
    constructor(color, row, col){
        this.color = color;
        this.row = row
        this.col = col
    }
    makeKing(){
        this.isKing = true;
    }
    isValidMove(x,y){
        return (
        (x === this.row + 1 || x === this.row - 1) && 
        (y === this.col + 1 || y === this.col - 1) &&
        (x >= 0 && x < 8) && 
        (y >= 0 && y < 8)
    )}
    movePiece(nextRow,nextCol){
        if (this.isValidMove(nextRow,nextCol)) {
            this.row = nextRow
            this.col = nextCol
        }
        else alert("Movimiento no permitido");
    }
    render(type = "string", element = ''){
        return type === "string" ? this.template() : this.create(element)
    }
    create(element){
        const img = document.createElement('img');
        Object.assign(img, {
            className: this.color,
            src: checker,
            "data-row": this.row,
            "data-col": this.col,
            alt: "pieza jugador " + this.color
        })
        element.appendChild(img);
    }
    template(){
        return `<img class="${this.color}" src="${checker}" alt="pieza jugador ${this.color}">`
    }

}

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
                    checkCoord(r,c) ? this.board[r].push(new Piece("black",r,c)) : this.board[r].push(null)
                break;
                }
                case r > 4: {
                    checkCoord(r,c) ? this.board[r].push(new Piece("red",r,c)) : this.board[r].push(null)
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
            cell.innerHTML= c?.render() ?? ''
            board.appendChild(cell);
        }))
        element.appendChild(board)
    }
}

const game = new Board(8,8);
game.getBoard()
game.createBoard(root);