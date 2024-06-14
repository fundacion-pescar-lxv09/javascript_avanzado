import { d, jph, links, events, root } from "./declarations.js";
import { users, todos, posts, comments, Nav } from "./views/index.js"
import { create } from "./methods.js";
import { getData } from "./promise.js";


const Main = () => {
    const main = create({tagName: "main", className: "container row m-auto p-2 gap-2 justify-content-center"
    })
    root.append(main)
}

const render = (array, callback) => {
    const main = d.querySelector('main');
    main.innerHTML = '';
    array.map(async (item) => {
        const data = await callback({callback: comments,...item})
        main.innerHTML+= data
    })
}

// Eventos
events.forEach(ev => d.addEventListener(ev, async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {target:tag} = e;

    if(tag.tagName === "A"){
        const url = tag.href.split("/")
        const current = url[url.length - 1]
        history.pushState(current, current, current)
        render(await getData({url: `${jph}/${current}`}), eval(current))
        if(location.pathname == "/posts") await comments()
    }
}))

// Ejecuciones
root.innerHTML+=Nav(links,"IT");
Main();