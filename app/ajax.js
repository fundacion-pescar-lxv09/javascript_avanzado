// Esperar a que se carguen todos los nodos del DOM
d.addEventListener('DOMContentLoaded', function() {

    // Trabajando con AJAX
    function ajax(url, data){
        const { method, callBack } = data;
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', ({target:t}) => {
            if(t.readyState === 4){
                t.status === 200 && callBack(t.response)
                t.status >= 400 && alert("Lo sentimos, ha ocurrido un error \n No se pudo recuperar la informacion")
            }
        })
        xhr.open(method ?? "GET", url);
        xhr.send()
    }

    // Navegacion interna
    const path = "/assets/content/";
    const links = [
        { text:'Document Object Model', url:'DOM.txt'},
        { text:'Browser Object Model', url:'BOM.txt'},
        { text:'JavaScript Object Notation', url:'JSON.txt'},
        { text:'Asynchronous JS & XML', url:'AJAX.txt'},
        { text:'Single Page Application', url:'SPA.txt'},
        { text:'eXtended Markup Language', url: 'XML.txt'}
    ]
    const main = d.querySelector('main');
    const content = d.createElement('article');
    const nav = d.createElement('div');
    links.forEach(({text, url}) => { 
        nav.innerHTML+=`<a class="btn btn-link" href="${path+url}" data-target="ajax">${text}</a>`
    })
    main.appendChild(nav);
    main.appendChild(content);
    // Navegacion con Peticiones HTTP
    const server = "https://jsonplaceholder.typicode.com"
    const xlinks = ["users", "albums", "posts"]
    const div = d.querySelector("main > div")
    xlinks.forEach(link => div.innerHTML+= `<a href="${server}/${link}" data-target="jph">${link}</a>`)
    // Eventos del DOM (CLICK)
    d.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {target: el} = event;

        if (el.tagName === "A" || el.tagName === "BUTTON"){
            if(el.getAttribute('data-target').toLowerCase() === "ajax")
                ajax(el.href, { 
                    callBack: (data) => content.innerHTML=data
                })
            if (el.getAttribute('data-target').toLowerCase() === "jph")
                ajax(el.href, {
                    callBack: (data) => console.log(JSON.parse(data))
            })
        }
    })
})