import Nav from "./views/Nav.js";
(function(){
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('root');
        root.appendChild(Nav());
    })
})()