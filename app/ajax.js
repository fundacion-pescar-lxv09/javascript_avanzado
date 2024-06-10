// Esperar a que se carguen todos los nodos del DOM
d.addEventListener('DOMContentLoaded', function() {

    // Trabajando con AJAX
    function ajax(url, data){
        const { method, target } = data;
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            console.log("cargado")
        })
        xhr.addEventListener('readystatechange', (e) => {
            if(e.target.readyState === 4 && e.target.status === 200){
                target.innerHTML= e.target.response
            }
        })
        xhr.open(method, url);
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
    ]
    const main = d.querySelector('main');
    const content = d.createElement('article');
    const nav = d.createElement('div');
    links.forEach(({text, url}) => { 
        nav.innerHTML+=`<a class="btn btn-link" href="${path+url}" data-target="ajax">${text}</a>`
    })
    main.appendChild(nav);
    main.appendChild(content);

    d.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target.tagName === "A"){
            if(e.target.getAttribute('data-target').toLowerCase() === "ajax"){
                ajax(e.target.href, {method: "GET", target: content})
            }
        }
        if (e.target.tagName === "BUTTON"){

        }
    })
})