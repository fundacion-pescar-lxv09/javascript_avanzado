import Deck from "./Deck.js"
import Events,{renderGame} from "./Events.js";
import Player from "./Player.js"
export const CardGame = () => {
    const container = document.createElement('div');
    const deck = new Deck();
    const player = new Player();
    deck.createDeck();
    deck.shuffle();
    Object.assign(container, {
        className: "container mx-auto p-3",
        innerHTML: renderGame(deck,player)
    })
    Events(deck, player, container);
    return container;
}