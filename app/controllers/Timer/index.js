export const Timer = () => {
    // Constructor
    function Clock(HH,mm,ss){
        this.HH = HH;
        this.mm = mm;
        this.ss = ss
    }
    // Metodos
    Clock.prototype.get = function(n){ return n < 10 ? `0${n}` : n    }
    Clock.prototype.set = function(k,n=0){ this[k] = n }
    Clock.prototype.getTime = function (){
        return `${this.get(this.HH)}:${this.get(this.mm)}:${this.get(this.ss)}`
    }
    // Agregar o Sustraer tiempo
    Clock.prototype.addTime = function(k,n=1){ this[k]+= n }
    Clock.prototype.susTime = function(k,n=1){ this[k]-= n }
    // Determinar tiempo
    Clock.prototype.timeUp = function(){
        // Manejo de Segundos
        if(this.ss < 59 ) this.addTime("ss")
        else this.set("ss")
        // Manejo de Minutos
        if(this.mm < 59 && this.ss === 0) this.addTime("mm")
        else if(this.ss === 0) this.set("mm")
        // Manejo de Horas
        if(this.mm == 0 && this.ss == 0) this.addTime("HH")
    }
    Clock.prototype.timeDown = function(){
        if (this.ss > 0) this.susTime("ss")
        else this.set("ss",59)
    
        if(this.mm > 0 && this.ss == 59) this.susTime("mm")
        else if (this.ss == 59) this.set("mm",59)
    
        if(this.mm == 59 && this.ss == 59) this.susTime("HH")
    }
    // Declaraciones
    let interval;
    const clock = new Clock(3,15,30)
    const start = (callback) => setInterval(callback, 10);
    const stop = (interval) => clearInterval(interval);
}