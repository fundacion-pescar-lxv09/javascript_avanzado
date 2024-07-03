export default function Events(deck, player, container){
    const buttons = ["start", "draw","bet", "split", "surrender"]
    buttons.forEach(b => {
        document.addEventListener('click', ({target})=>{
            if(target.id === b ) eval(`${b}(target)`)
        })
    })
    function start(target){
        for(let i = 0; i < 2; i++) getCard()
        isWinner() && celebrate()
        target.setAttribute("disabled", true);
    }
    function draw(){
        if(next()){
            getCard()
            isWinner() && celebrate()
            check() && cry()
        }
    }
    function bet(){
        hasMoney(10) && player.bet(10)
        renderPlayer(player)
    }
    function split(){
        hasMoney(player.ammount) && player.split();
        renderPlayer(player)
    }
    function surrender(){
        cry()
    }
    function isWinner(){
        return player.score === 21;
    }
    function celebrate(){
        showMessage(player.win())
    }
    function cry(){
        showMessage(player.loose())
    }
    function showMessage(msg){
        setTimeout(() => { alert(msg);
            container.innerHTML = renderGame(deck,player)
        }, 500)
    }
    function hasMoney(ammount){
        return player.money >= ammount
    }
    function next(){
        return player.score < 21
    }
    function check(){
        return player.score > 21
    }
    function getCard(){
        const cards = document.querySelectorAll('.box .suit');
        const space = document.querySelector('.card-space:not(.occupied)')
        const current = Array.from(cards).pop()
        space.appendChild(current);
        space.classList.add('occupied');
        player.score+=calcScore(parseInt(current.dataset.value));
    }
    function calcScore(n){
        return n === 11 ? (player.score >= 11 ? 1 : n) : n
    }
}
export function renderGame(deck, player){
    deck.shuffle();
    player.score = 0;
    return `
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
}
export function renderPlayer(player){
    const gameScore = document.querySelector('.player')
    gameScore.outerHTML = player.render()
}