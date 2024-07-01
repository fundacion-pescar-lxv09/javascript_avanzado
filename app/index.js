import Nav,{objectLinks} from "./views/Nav.js";
import Section from "./views/Section.js"
(function(){
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('root');
        root.appendChild(Nav());
        objectLinks.map(({url,text})=> 
            root.appendChild(Section(text,url.replace("#",""))
        ))
    })
})()