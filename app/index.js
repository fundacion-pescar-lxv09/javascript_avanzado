/* Declaraciones */
const d = document;
const navButton = d.querySelector("nav .nav__button");
const navMenu = d.querySelector("nav ul");

const mapButton = d.querySelector("footer .map__button");
const mapFrame = d.querySelector("iframe.map");

/* Funciones */
function toggle(element, className="active"){
    element.classList.toggle(className);
}
/* Eventos */
navButton.onclick = () => toggle(navMenu)
mapButton.onclick = () => toggle(mapFrame)