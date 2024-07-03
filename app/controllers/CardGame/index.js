import Deck from "./Deck.js"
export const CardGame = () => {
    const container = document.createElement('div');
    const deck = new Deck();
    deck.createDeck();
    deck.shuffle();
    Object.assign(container, {
        className: "box mx-auto p-3",
        innerHTML: deck.render()
    })
    return container;
}