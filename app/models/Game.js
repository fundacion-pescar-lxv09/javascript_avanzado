import { Player } from "./Player.js";
import { Board } from "./Board.js";
import { root, checker } from "../utils.js";
export class Game {
    constructor(players){
        this.board = new Board();
        this.players = players.map(({name,color}) => new Player(name, color))
        this.selected = null;
    }
    init() {
        const [p1,p2] = this.players
        this.players[0].isTurn = true;
        this.players[1].isTurn = false;
        this.board.getBoard(p1.color, p2.color);
        this.board.createBoard(root, checker);
    }
    startGame(){
        if (confirm("¿Desea iniciar una nueva partida ?")) this.init()
    }
    loadGame(){
        if (confirm("¿Desea cargar una partida guardada?")) this.load()
    }
    saveGame(){
        if (confirm("¿Desea guardar la partida actual?")) this.save()
    }
}