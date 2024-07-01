// Modelos
import MenuLinks from "./models/menu.json" with {type: 'json'}
// Controladores

// Vistas
import Nav from "./views/Nav.js";
import Section from "./views/Section.js"
(function(){
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('root');
        root.appendChild(Nav(MenuLinks));
        MenuLinks.map(({url,text,app})=> 
            root.appendChild(Section(text,url.replace("#",""))
        ))
    })
})()