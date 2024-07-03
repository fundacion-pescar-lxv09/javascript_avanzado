import Deck from "./Deck.js"
import Player from "./Player.js"
export const CardGame = () => {
    const container = document.createElement('div');
    const deck = new Deck();
    const player = new Player();
    deck.createDeck();
    deck.shuffle();
    Object.assign(container, {
        className: "container mx-auto p-3",
        innerHTML: `
            ${player.render()}
            <div class="box">${ deck.render() }</div>
            ${ deck.createMat() }
            <div class="controls">
                <button id="start">Empezar Nuevo Juego</button>
                <button id="draw">Pedir</button>
                <button id="bet">Apostar</button>
                <button id="split">Doblar Apuesta</button>
                <button id="surrender">Rendirse</button>
            </div>
        `
    })
    return container;
}