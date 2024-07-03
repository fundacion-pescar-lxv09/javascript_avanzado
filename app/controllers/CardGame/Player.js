class Player{
    constructor(score=0, name="player", money=1000, ammount=0){
        this.score = score; // cartas
        this.name = name;
        this.money = money;
        this.ammount = ammount;
        this.message = "no existen ganadores"
    } 
    draw(value){
        this.score+= value
    }
    bet(ammount){
        this.money-= ammount;
        this.ammount+= ammount;
    }
    split(){
        this.money-= this.ammount;
        this.ammount*=2;
    }
    win(){
        return this.message = "¡Felicitaciones! Has ganado"
    }
    loose(){
        return this.message = "¡Lo sentimos! Has perdido"
    }
    reset(){
        this.score = 0;
        this.money = 1000;
        this.ammount = 0;
        this.message = "no existen ganadores"
    }
    render(player=""){
        player="<ul class=\"player\">"
        Object.keys(this).map(k => (k !== "message" && k !== "score") ?
            player+=`<li><strong>${k}:</strong> ${this[k]}</li>` : null
        )
        player+="</ul>"
        return player
    }
}
export default Player;