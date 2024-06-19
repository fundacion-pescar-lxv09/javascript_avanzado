import { d, jph, links, events, root } from "./declarations.js";
import { users, todos, posts, Nav, Main } from "./views/index.js"
import { getData } from "./promise.js";

const render = (array, callback) => {
    const main = d.querySelector('main');
    main.innerHTML = '';
    array.map(async (item) => {
        const data = await callback(item)
        main.innerHTML+= data
})}

// Eventos
events.forEach(ev => d.addEventListener(ev, async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {target:tag} = e;

    if(tag.tagName === "A"){
        const current = tag.href.split("/").pop()
        history.pushState(current, current, current)
        render(await getData({url: `${jph}/${current}`}), eval(current))
    }
}))

// Ejecuciones
root.innerHTML+=Nav(links,"IT");
root.innerHTML+=Main("Selecciona alguno de los links principales");