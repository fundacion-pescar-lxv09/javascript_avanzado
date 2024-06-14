import { d, jph, links, events, root } from "./declarations.js";
import { users, todos, posts } from "./views/index.js"
import { create } from "./methods.js";
import { getData } from "./promise.js";

const Menu = ({links, tag = 'a', container = 'div', inside = root }) => {
    const Container = d.createElement(container);
    Object.assign(Container, {
        className: 'navbar navbar-dark navbar-nav bg-dark p-3'
    })
    links.forEach(
        l => {
            const element = d.createElement(tag)
            Object.assign(element, {
                className: 'nav-link',
                href: `${jph}/${l}`,
                innerHTML: l
            })
            Container.appendChild(element)
        })
    inside.appendChild(Container);
}

const Main = () => {
    const main = create({tagName: "main", className: "container row m-auto p-2 gap-2 justify-content-center"
    })
    root.append(main)
}

const render = (array, callback) => {
    const main = d.querySelector('main');
    main.innerHTML = '';
    array.map(item => main.innerHTML+=callback(item))
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
    }
}))

// Ejecuciones
Menu({links});
Main();