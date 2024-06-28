// IIFE (Inmediately Invoked Function Expression)
( function() {
    
const d = document;
const root = d.getElementById('root');
const checker = "assets/checker.svg";
const totalCols = 8;
const totalRows = 8;
root.className = 'light-bg'
let currentTheme = 'light-bg'


// Utils
const even = (n) => n % 2 === 0
const odd = (n) => n % 2 === 1
const checkCoord = (r,c) => (even(r) && even(c)) || (odd(r) && odd(c))

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
        return (
        (x == this.row + 1 || x == this.row - 1) && 
        (y == this.col + 1 || y == this.col - 1)
    )}
    movePiece(nextRow,nextCol){
        if (this.isValidMove(nextRow,nextCol)) {
            this.row = nextRow
            this.col = nextCol
            return true
        }
        else return false;
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
        return `<img class="${this.color}" 
            src="${checker}" 
            data-row="${this.row}" 
            data-col="${this.col}"
            alt="pieza ${this.color} ${this.row} ${this.col}"
            draggable>`
    }

}

class Board {
    constructor(rows,cols){
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
                if (r < 3 || r > 4) this.board[r].push(
                    checkCoord(r,c) ? new Piece(color,r,c) : null
                )
                else this.board[r].push(null);
            }
        }
    }
    createBoard(element){
        const board = d.createElement('div');
        board.setAttribute("class", "board");
        this.board.map((row,rowIndex)=> row.map((c,cellIndex) => {
            const cell = d.createElement('div')
            cell.setAttribute("class", even(rowIndex) ? (even(cellIndex) ? "dark":"light") : (odd(cellIndex) ? "dark":"light"))
            cell.dataset.row = rowIndex;
            cell.dataset.col = cellIndex;
            cell.innerHTML= c?.render() ?? ''
            board.appendChild(cell);
        }))
        element.appendChild(board)
    }
    updateBoard (prevRow, prevCol, nextRow, nextCol){
        const piece = this.board[prevRow][prevCol]
        this.board[nextRow][nextCol] = piece
        this.board[prevRow][prevCol] = null
    }
}

const players = [
    new Player("player 1", "black"),
    new Player("player 2", "red")
];
const game = new Board(totalRows, totalCols);
game.getBoard(players[0].color, players[1].color);

const createButton =(color, innerText, onclick) => {
    const button = d.createElement("button")
    Object.assign(button, {
        className: "btn btn-"+color,
        innerText,
        onclick
    })
    return button
}
const gameControls = () =>{
    const controls = d.createElement("div")
    controls.setAttribute("class", "game-controls");
    const start = createButton("primary", "EMPEZAR", () => {
        if(confirm("¿desea empezar una nueva partida?")) gameStart()
    })
    const save = createButton("success", "GUARDAR", () => {
        if(confirm("¿desea guardar la partida?")) saveGame()
    })
    const load = createButton("secondary", "CARGAR", () => {
        if(confirm("¿desea cargar la ultima partida?")) loadGame()
    })
    const theme = createButton("secondary", "CAMBIAR TEMA", () => {
        root.classList.contains('light-bg') ? changeTheme(root, 'dark-bg') : changeTheme(root, 'light-bg')
        currentTheme = root.className
        console.log(currentTheme);
    })
    controls.append(start,save, theme)
    root.appendChild(controls)
    
}
// Acciones del Juego
let selected;
const events = ['click', 'dragstart', 'dragover', 'drop']
const gameStart = () => {
    players[0].isTurn = true;
    players[1].isTurn = false;
    game.getBoard("black", "red")
    game.createBoard(root);
}
const saveGame = () => {
    localStorage.setItem("board", JSON.stringify(game.board));
    localStorage.setItem("players", JSON.stringify(players));
}
const loadGame = () =>{
    const loaded = localStorage.getItem("board") ?? 'no se encontraron partidas';
    game.board = loaded.board;
    updateBoard()
}
const changeTheme = (element, theme) => {
    element.className = ''
    element.classList.add(theme)
}
const gameActions = (e,action) => {
    const {target:el, target:{dataset:ds}, target:{dataset:{row,col}},} = e
    const current = players.filter(({isTurn}) => isTurn === true )[0];
    switch(action){
        case "click":
            if (el.tagName === "IMG" && el.classList.contains(current.color)){
                selected = el
            }
            if (el.classList.contains("dark") && selected != undefined) {
                const {dataset:{row:r, col:c}} = selected
                el.appendChild(selected)
                game.updateBoard(r, c, row, col)
                selected.dataset.row = row
                selected.dataset.col = col
                selected = null;
                players.forEach(p => p.changeTurn())
                console.log(players)
            }
        break;
        case "dragstart":
            e.dataTransfer.setData("piece",`${row},${col}`);
        break;
        case "dragover":
            e.preventDefault()
            e.stopPropagation()
        break;
        case "drop":
            if(el.classList.contains("dark")){
                const [r,c] = e.dataTransfer.getData("piece").split(",");
                const img = d.querySelector(`img[data-row="${r}"][data-col="${c}"]`)
                const piece = game.board[r][c]
                if(piece?.movePiece(row,col)){
                    el.appendChild(img)
                    img.dataset.row = piece.row
                    img.dataset.col = piece.col
                    game.updateBoard(r,c,row,col)
                    console.log(game)
                }
            }
        break;
    }
}
events.forEach(action => {
    d.addEventListener(action, (e) => gameActions(e, action))
})
gameControls()

})()