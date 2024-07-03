class Deck {
    cards = []
    createDeck(){
        ["♠️","♣","♥️","♦️"].map(suit => {
            const color = (suit === "♠️" || suit === "♣") ? "black" : "red"
            for(let value = 2; value <= 10; value++) this.cards.push({ 
                suit, color,
                value, 
                name: value 
            })
            Array.from(["J","Q","K","A"]).map(r => this.cards.push({
                suit, color,
                value: r === "A" ? 11 : 10,
                name:`${r}`
            }))
        })
    }
    shuffle(){
        console.log("barajando");
    }
    render(deck=""){
        this.cards.map(({name,color,value, suit}) => 
            deck+=`<div class="suit ${color}" data-suit="${suit}" data-value="${value}">
                <span>${name}</span>
            </div>`)
        return deck;
    }
}

export default Deck;