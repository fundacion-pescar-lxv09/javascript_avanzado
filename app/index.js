import { Player } from "./models/Player.js";
import { Board } from "./models/Board.js";
import { d, root, checker } from "./utils.js";
// IIFE (Inmediately Invoked Function Expression)
( function() {
const players = [
    new Player("player 1", "black"),
    new Player("player 2", "red")
];
const game = new Board();
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
    controls.append(start,save)
    root.appendChild(controls)
}
// Acciones del Juego
let selected;
const events = ['click', 'dragstart', 'dragover', 'drop']
const gameStart = () => {
    players[0].isTurn = true;
    players[1].isTurn = false;
    game.getBoard("black", "red")
    game.createBoard(root, checker);
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