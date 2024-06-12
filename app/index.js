const 
    d = document,
    jph = "https://jsonplaceholder.typicode.com",
    links = ["users", "todos", "posts"],
    events = ["click", "input", "focus", "keypress"],
    root = d.getElementById("root")
;

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

Menu({links});

events.forEach(ev => d.addEventListener(ev, (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {target:tag} = e;

    if(tag.tagName === "A"){
        const url = tag.href.split("/")
        const current = url[url.length - 1]
        history.pushState(current, current, current)
    }
}))
