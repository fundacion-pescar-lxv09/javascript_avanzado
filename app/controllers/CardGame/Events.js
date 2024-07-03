function Events(deck, player){
    const cards = document.querySelectorAll('.suit');
    const buttons = ["start", "draw","bet", "split", "surrender"]
    buttons.forEach(b => {
        const btn = document.getElementById(b);
        btn.addEventListener('click', eval("()=> b()"))
    })
    function start(){
        for(let i = 0; i < 2; i++) getCard()
    }
    function draw(){
        if(next()){
            getCard()
            player.score === 21 && alert(player.win())
            check() && alert(player.loose());
        }
    }
    function bet(){

    }
    function split(){

    }
    function surrender(){

    }
    function next(){
        return player.score < 21
    }
    function check(){
        return player.score > 21
    }
    function getCard(space){
        const space = document.querySelector('.card-space:not(.occupied)')
        const current = cards[cards.length - 1]
        space.appendChild(current);
        space.classList.add('occupied');
        Array.from(cards).pop()
        player.score+=parseInt(current.dataset.value);
    }
}