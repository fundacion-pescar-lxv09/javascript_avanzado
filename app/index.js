// IIFE (Inmediately Invoked Function Expression)
( function() {
    
const d = document;
const root = d.getElementById('root');
const checker = "assets/checker.svg";
const totalCols = 8;
const totalRows = 8;

const checkCoord = (row, col) => 
    (row % 2 === 0 && col % 2 === 0) || 
    (row % 2 === 1 && col % 2 === 1)

class Player{
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
        (x >= 0 && x < totalRows) && 
        (y >= 0 && y < totalCols)
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
    constructor(rows,cols){
        this.rows = rows;
        this.cols = cols;
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
gameControls()

function gameControls(){
    const controls = d.createElement("div")
    controls.setAttribute("class","game-controls")
    const start = () => {
        const startButton = d.createElement("button")
        Object.assign(startButton, {
            className: "btn btn-primary",
            innerText: "EMPEZAR",
            onclick: () => {
                const player = new Player("player 1", "black");
                player.changeTurn();
                const game = new Board(totalRows, totalCols);
                game.getBoard();
                game.createBoard(root);
            }
        })
        return startButton
    }
    const reset = () => {
        const resetButton = d.createElement("button")
        Object.assign(resetButton, {
            className: "btn btn-danger",
            onclick: () => start().click()
        })
        resetButton.innerHTML = "REINICIAR"
        return resetButton
    }
    controls.append(start(), reset())
    root.appendChild(controls)
}
})()