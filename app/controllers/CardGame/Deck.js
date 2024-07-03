class Deck {
    cards = []
    createDeck(){
        const royal = ["J","Q","K","A"];
        ["♠️","♣","♥️","♦️"].map(suit => {
            const color = suit.includes("♠️"||"♣") ? "black" : "red"
            for(let value = 2; value <= 10; value++) this.cards.push({ suit, color, value, name:value })
            royal.map(r => this.cards.push({ suit, color, value: r === "A" ? 11 : 10, name:r }))
        })
    }
    shuffle(){
        for(let i = this.cards.length - 1; i > 0; i--){
            const r = Math.floor(Math.random() * i + 1);
            [this.cards[i], this.cards[r]]=[this.cards[r], this.cards[i]]
        }
    }
    render(deck=""){
        this.cards.map(({name,color,value, suit}) => deck+=`
            <div class="suit ${color}" data-suit="${suit}" data-value="${value}">
                <span>${name}</span>
                <span class="bg"></span>
            </div>`)
        return deck;
    }
    createMat(playmat=""){
        playmat='<div class="playmat">'
        for(let i=0; i < 5; i++){
            playmat+='<div class="card-space"></div>'
        }
        playmat+="</div>"
        return playmat;
    }
}
export default Deck;