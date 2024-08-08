export const Timer = () => {
    // Constructor
    class Clock {
        constructor(HH, mm, ss) {
            this.HH = HH;
            this.mm = mm;
            this.ss = ss;
        }
        get(n){ return n < 10 ? `0${n}` : n; }
        set(k, n = 0){ this[k] = n; }
        getTime() { return `${this.get(this.HH)}:${this.get(this.mm)}:${this.get(this.ss)}`; }
    }
    class Chron extends Clock{
        constructor(){
            super(...arguments)
        }
        addTime (k,n=1){ this[k]+= n }
        timeUp (){
            if(this.ss < 59 ) this.addTime("ss") 
            else this.set("ss")

            if(this.mm < 59 && this.ss === 0) this.addTime("mm")
            else if(this.ss === 0) this.set("mm")

            if(this.mm == 0 && this.ss == 0) this.addTime("HH")
        }
    }
    class Timer extends Clock{
        constructor(){
            super(...arguments)
        }
        susTime (k,n=1){ this[k]-= n }
        timeDown () {
        if (this.ss > 0) this.susTime("ss")
            else this.set("ss",59)
        
        if(this.mm > 0 && this.ss == 59) this.susTime("mm")
            else if (this.ss == 59) this.set("mm",59)
        
        if(this.mm == 59 && this.ss == 59) this.susTime("HH")
        }
    }
    // Declaraciones
    let interval;
    
    const start = (callback) => setInterval(callback, 1000);
    const stop = (interval) => clearInterval(interval);


    function startClock(e){
        const clock = document.querySelector('.clock');
        const data = new FormData(e)
        console.log(clock, data.entries())
    }
    function stopClock(){
        const clock = document.querySelector('.clock');
        console.log(clock)
    }
    function resetClock(){
        const clock = document.querySelector('.clock');
        console.log(clock)
    }
    const render = () => {
        const content = Object.assign( document.createElement('div'), {
            id: "timer",
            innerHTML: `
                <p>00:00:00</p>
                <form class="clock">
                    <input type="number" name="HH" min="0"  max="">
                    <input type="number" name="mm" min="0"  max="59">
                    <input type="number" name="ss" min="0"  max="59">
                </form>
                <button id="startClock" data-target="HH">Empezar</button>
                <button id="stopClock" data-target="mm">Detener</button>
                <button id="resetClock" data-target="ss">Reiniciar</button>
            `,
            onclick: ({target}) =>{
                eval(`${target.id}()`)
            }
        })
        return content
    }
    return render()
}